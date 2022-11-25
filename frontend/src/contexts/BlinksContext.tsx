import { createContext } from "react";

import { useParams } from "react-router-dom";

import { IMessageEvent } from "websocket";
import { Blink as BlinkType } from "../types";

import { useBlink } from "../hooks";

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
        blinks,
        send
    } = useBlink();

    const { eyeId } = useParams<{ eyeId: string }>();

    return (
        <BlinksContext.Provider value={{
            connected,
            blinks,
            send,
        }}>
            {children}
        </BlinksContext.Provider>
    );
};