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

    // Catch the incoming messages
    client.onmessage = (message: IMessageEvent) => {
        const data: Response = JSON.parse(message.data.toString());

        const payloadBlinks = JSON.parse(data.payload) as Blink[];

        if (data.type === 'get_blinks') {
            setBlinks(payloadBlinks);
        } else if (data.type == 'get_blink') { 
            const updatedBlinks = blinks.map(blink => {
                if (blink.id == payloadBlinks[0].id) {
                    return payloadBlinks[0];
                }

                return blink;
            });

            setBlinks(updatedBlinks);
        }
    }

    client.onerror = (error) => {
        setError(error);
    }

    useEffect(() => {
        return () => {
            if (client.readyState === 1)
                client.close();
        }
    }, [])

    return { blinks, error }
};


export { useBlinks };