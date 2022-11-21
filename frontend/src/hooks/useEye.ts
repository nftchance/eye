import { useEffect, useMemo, useState } from 'react';

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import { Eye } from '../types';

const useEye = (eyeId: string | undefined) => {
    const client = useMemo(() => {
        const url = `ws://localhost:8000/ws/eye/${eyeId ? `${eyeId}/` : ''}`;

        return new W3CWebSocket(url)
    }, []);

    const [connected, setConnected] = useState(false);
    const [eyes, setEyes] = useState<Eye[]>([]);

    useEffect(() => {
        client.onopen = () => {
            if (eyeId) {
                client.send(JSON.stringify({
                    action: 'retrieve',
                    request_id: new Date().getTime(),
                    pk: eyeId
                }));
            } else {
                client.send(JSON.stringify({
                    action: 'list',
                    request_id: new Date().getTime()
                }));
            }
        }

        client.onmessage = (message: IMessageEvent) => {
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
    }, [eyeId]);

    return {
        client,
        connected,
        eyes
    };
}

export { useEye };