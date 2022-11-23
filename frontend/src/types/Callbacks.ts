import { IMessageEvent } from "websocket";

interface Callbacks {
    [key: string]: (response: IMessageEvent) => void
}

export type { Callbacks }
