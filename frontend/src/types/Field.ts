interface Field {
    name: string;
    label: string;
    type: string;
    value: string | Number;
    error: string | null;
    hidden?: boolean;
}

export type { Field };