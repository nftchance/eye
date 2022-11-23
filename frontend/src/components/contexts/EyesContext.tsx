import { createContext } from "react";

import { IMessageEvent, w3cwebsocket as W3CWebSocket } from "websocket";
import { Eye as EyeType } from "../../types";

import { useEye } from "../../hooks";

export const EyesContext = createContext({
    connected: false,
    eyes: [] as EyeType[],
    send: (
        message: string,
        callback: (response: IMessageEvent) => void 
    ) => {},
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
    } = useEye(undefined);

    return (
        <EyesContext.Provider value={{
            connected,
            eyes,
            send,
        }}>
            {children}
        </EyesContext.Provider>
    );
};