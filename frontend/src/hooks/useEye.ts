import { useEffect, useMemo, useState } from 'react';

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import { Callbacks, Eye } from '../types';

const useEye = (eyeId: string | undefined) => {
    // Websocket client that connects to the Eye consumer
    const client = useMemo(() => {
        const url = `ws://localhost:8000/ws/eye/${eyeId ? `${eyeId}/` : ''}`;

        return new W3CWebSocket(url)
    }, []);

    // Callback dictionary that handles the post-processing when we need
    // to wait on a response.
    const callbacks = useMemo<Callbacks>(() => ({}), []);

    const [connected, setConnected] = useState(false);
    const [eyes, setEyes] = useState<Eye[]>([]);

    const send = async (
        message: string,
        callback: (response: IMessageEvent) => void
    ) => {
        if (client.readyState === client.OPEN) {
            const requestId = JSON.parse(message).request_id;

            // Set the callback so that we can handle the response
            callbacks[requestId] = callback;

            // Send the actual message to the server
            client.send(message);
        }
    };

    useEffect(() => {
        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'list',
                request_id: new Date().getTime()
            }));
        }

        client.onmessage = (message: IMessageEvent) => {
            const data = JSON.parse(message.data.toString());

            // Call the callback if it exists and remove it from the dictionary
            const callback = callbacks[data.request_id];

            if (callback) {
                callback(message);

                delete callbacks[data.request_id];

                return
            }

            if (data.action === 'connected') {
                setConnected(true);
            } else if (data.action === 'list') {
                setEyes(data.data);
            } else if (data.action === 'update') {
                setEyes(eyes => eyes.map(eye => eye.id === data.data.id ? data.data : eye));
            } else if (data.action === 'create') {
                setEyes(eyes => [...eyes, data.data]);
            } else if (data.action === 'delete') {
                setEyes(eyes => eyes.filter(eye => eye.id !== data.data.id));
            } else if (data.action === 'retrieve') {
                setEyes([data.data]);
            } else {
                console.log('Unknown action', data);
            }
        }
    }, []);

    return {
        connected,
        eyes,
        send,
    };
}

export { useEye };