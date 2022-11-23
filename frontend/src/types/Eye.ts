import { Blink } from '.';

interface Eye {
    id: string;
    name: string;
    description: string;
    blinks: Blink[];
}

export type { Eye };