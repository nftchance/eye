import { useEffect, useMemo, useState } from 'react';

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

import { Blink, Response } from "../types"

const useBlinks = ({
    eyeId
}: { 
    eyeId: string | undefined
}): {
    blinks: Blink[] | null,
    error: {} | null,
} => {
    if (!eyeId) {
        return { blinks: null, error: { message: "no Eye id" } };
    }

    const [blinks, setBlinks] = useState<Blink[]>([]);
    const [error, setError] = useState<{} | null>(null);

    const client = useMemo(
        () => new W3CWebSocket(`ws://127.0.0.1:8000/ws/${eyeId}/`),
        [eyeId]
    )

    const typeCaller = (type: string) => {
        switch (type) {
            case "create_blink":
                break;
            case "get_blinks":
                break; 
            case "get_blink":
                break;
            case "update_blink":
                break;
            case "delete_blink":
                break;
            default:
                return () => { };
        }
    }

    // Catch the incoming messages
    client.onmessage = (message: IMessageEvent) => {
        const data: Response = JSON.parse(message.data.toString());

        const payloadBlinks = JSON.parse(data.payload) as Blink[];

        let newBlinks = [...blinks];

        if (data.type === 'get_blinks') {
            newBlinks = payloadBlinks;
        } else if (data.type == 'get_blink') { 
            newBlinks = blinks.map(blink => blink.id == payloadBlinks[0].id ? payloadBlinks[0] : blink);
        } else if (data.type == 'create_blink') {
            // newBlinks = [...blinks, payloadBlinks[0]];
        } else if (data.type == 'update_blink') {
            // newBlinks = blinks.map(blink => blink.id == payloadBlinks[0].id ? payloadBlinks[0] : blink);
        } else if (data.type == 'delete_blink') {
            // newBlinks = blinks.filter(blink => blink.id != payloadBlinks[0].id);
        } 

        setBlinks(newBlinks);
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