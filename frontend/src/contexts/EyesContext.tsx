import { createContext } from "react";

import { IMessageEvent } from "websocket";
import { Eye as EyeType } from "../types";

import { useBlink, useEye } from "../hooks";

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
        eyes,
        send
    } = useEye();

    return (
        <EyesContext.Provider value={{
            connected,
            eyes,
            send,
        }}>
            <BlinksContextProvider>
                {children}
            </BlinksContextProvider>
        </EyesContext.Provider>
    );
};