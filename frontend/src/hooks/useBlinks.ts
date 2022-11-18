import { useEffect, useMemo, useState } from 'react';

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import { Blink, Response } from "../types"

const useBlinks = ({
    organizationId
}: { 
    organizationId: string | undefined
}): {
    blinks: Blink[] | null,
    error: {} | null,
} => {
    if (!organizationId) {
        return { blinks: null, error: { message: "no organization id" } };
    }

    // connect to the websocket for the organization id
    const [blinks, setBlinks] = useState<Blink[]>([]);
    const [error, setError] = useState<{} | null>(null);

    const client = useMemo(
        () => new W3CWebSocket(`ws://127.0.0.1:8000/ws/${organizationId}/`),
        [organizationId]
    )

    useEffect(() => {
        client.onopen = () => {
            console.log('WebSocket Client Connected');
        };

        // Catch the incoming messages
        client.onmessage = (message: IMessageEvent) => {
            const data: Response = JSON.parse(message.data.toString());

            if (data.type === 'get_blinks') {
                setBlinks(data.payload);
            }
        }

        client.onclose = () => {
            console.log('websocket closed');
        }

        client.onerror = (error) => {
            setError(error);
        }

        return () => {
            // Only close once the websocket has already been opened
            if (client.readyState === 1) {
                client.close();
            }
        }
    }, [])

    return { blinks, error }
};


export { useBlinks };