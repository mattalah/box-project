export interface Box {
    id: number;
    options: Array<Option>;
    selectedOption: Option | null;
    selected: boolean;
}
export interface Option {
    id: number;
    name: string;
    value: number;
}