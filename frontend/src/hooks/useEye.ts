import { useEffect, useMemo, useState } from 'react';

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";

const useEye = () => {
    const client = new W3CWebSocket('ws://127.0.0.1:8000/ws/eye/');

    client.onopen = () => { 
        console.log('WebSocket Client Connected');
    }

    client.onmessage = (message: IMessageEvent) => {
        console.log(message.data);
    }

    return { client };
}

export { useEye };