import { createContext } from "react";

import { IMessageEvent } from "websocket";
import { Eye as EyeType } from "../types";

import { useSocket } from "../hooks";

import { BlinksContextProvider } from "./BlinksContext";

export const EyesContext = createContext({
    connected: false,
    eyes: [] as EyeType[],
    send: (
        message: string,
        callback: (response: IMessageEvent) => void
    ) => { },
});

export const EyesContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const {
        connected,
        data,
        send
    } = useSocket({ 
        url: 'ws://localhost:8000/ws/eye/'
    });

    return (
        <EyesContext.Provider value={{
            connected,
            eyes: data as EyeType[],
            send,
        }}>
            <BlinksContextProvider>
                {children}
            </BlinksContextProvider>
        </EyesContext.Provider>
    );
};