import { createContext } from "react";

import { Eye as EyeType } from "../../types";

import { useEye } from "../../hooks";

export const EyesContext = createContext({
    connected: false,
    eyes: [] as EyeType[],
});

export const EyesContextProvider = ({
    children
}: {
    children: React.ReactNode
}) => {
    const {
        connected,
        eyes
    } = useEye(undefined);

    return (
        <EyesContext.Provider value={{
            connected,
            eyes
        }}>
            {children}
        </EyesContext.Provider>
    );
};