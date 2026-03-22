// src/types/menu.ts
export interface Menu {
    id: string;
    name: string;
    price: number;
    category: string;
    description: string;
}

export interface FormState {
    name: string;
    price: number;
    category: string;
    description: string;
}

export type FormAction = 
    | { type: "CHANGE_INPUT"; field: string; value: string | number }
    | { type: "RESET_FORM" }
    | { type: "FILL_FORM"; payload: FormState };