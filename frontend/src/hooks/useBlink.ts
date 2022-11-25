import { useEffect, useMemo, useState } from 'react';

import ReconnectingWebSocket from 'reconnecting-websocket';
import { IMessageEvent } from "websocket";

import { Callbacks, Blink } from '../types';

const useBlink = () => {
    // Websocket client that connects to the Eye consumer
    const client = useMemo(() => {
        const url = 'ws://localhost:8000/ws/blink/';

        return new ReconnectingWebSocket(url)
    }, []);

    // Callback dictionary that handles the post-processing when we need
    // to wait on a response.
    const callbacks = useMemo<Callbacks>(() => ({}), []);

    const [connected, setConnected] = useState(false);
    const [blinks, setBlinks] = useState<Blink[]>([]);

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

        // We encountered an error
        if(data.data === null) return;
        
        if (data.action === 'connected') {
            setConnected(true);
        } else if (data.action === 'list') {
            setBlinks(data.data);
        } else if (data.action === 'update') {
            setBlinks(eyes => eyes.map(eye => eye.id === data.data.id ? data.data : eye));
        } else if (data.action === 'create') {
            setBlinks(eyes => [...eyes, data.data]);
        } else if (data.action === 'delete') {
            setBlinks(eyes => eyes.filter(eye => eye.id !== data.data.id));
        } else if (data.action === 'retrieve') {
            setBlinks([data.data]);
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
        blinks,
        send,
    };
}

export { useBlink };