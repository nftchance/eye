import { Blink, Eye, Field } from "../types";

const useEyeFields = (eye?: Eye): Field[] => {
    return [
        {
            name: "name",
            label: "Name",
            type: "text",
            value: eye?.name || "",
            error: null
        },
        {
            name: "description",
            label: "Description",
            type: "text",
            value: eye?.description || "",
            error: null
        },
    ]
}

const useBlinkFields = (
    eye?: Eye,
    blink?: Blink,
): Field[] => {
    return [
        { 
            name: "eye",
            label: "Eye",
            type: "text",
            value: eye?.id || "",
            error: null,
            hidden: true,
        },
        {
            name: "url",
            label: "URL",
            type: "text",
            value: blink?.url || "",
            error: null
        },
        {
            name: "frequency",
            label: "Frequency (Seconds)",
            type: "number",
            value: blink?.frequency || 30,
            error: null
        },
    ]
}

export { useBlinkFields, useEyeFields }