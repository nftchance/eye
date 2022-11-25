import { useEffect, useMemo, useState } from 'react';

import ReconnectingWebSocket from 'reconnecting-websocket';
import { IMessageEvent } from "websocket";

import { Callbacks, Eye } from '../types';

const useEye = () => {
    // Websocket client that connects to the Eye consumer
    const client = useMemo(() => {
        const url = 'ws://localhost:8000/ws/eye/';

        return new ReconnectingWebSocket(url)
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

    const handleCallback = (message: IMessageEvent) => {
        const data = JSON.parse(message.data.toString());

        if (data.request_id in callbacks) {
            callbacks[data.request_id](message);
            delete callbacks[data.request_id];

            return true;
        }
    }

    const handleAction = (message: IMessageEvent) => {
        const data = JSON.parse(message.data.toString());
        
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

    useEffect(() => {
        client.onopen = () => {
            client.send(JSON.stringify({
                action: 'list',
                request_id: new Date().getTime()
            }));
        }

        client.onmessage = (message: IMessageEvent) => {
            // Handle the callback if one exists
            const called = handleCallback(message)
            if(called) return;

            // Handle the action
            handleAction(message);
        }
    }, []);

    return {
        connected,
        eyes,
        send,
    };
}

export { useEye };