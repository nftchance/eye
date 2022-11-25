import { createContext } from "react";

import { IMessageEvent } from "websocket";
import { Blink as BlinkType } from "../types";

import { useSocket } from "../hooks";

export const BlinksContext = createContext({
    connected: false,
    blinks: [] as BlinkType[],
    send: (
        message: string,
        callback: (response: IMessageEvent) => void 
    ) => {},
});

export const BlinksContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const {
        connected,
        data,
        send
    } = useSocket({ 
        url: 'ws://localhost:8000/ws/blink/'
    });

    return (
        <BlinksContext.Provider value={{
            connected,
            blinks: data as BlinkType[],
            send,
        }}>
            {children}
        </BlinksContext.Provider>
    );
};