interface Field {
    name: string;
    label: string;
    type: string;
    value: string;
    required: boolean;
    error: string | null;
}

export type { Field };