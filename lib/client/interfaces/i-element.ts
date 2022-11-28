export interface IElement {
    click: () => Promise<void>;
    type: (value: string) => Promise<void>;
    inputValue: () => Promise<string>;
    innerText: () => Promise<string>;
    textContent: () => Promise<string | null>;
    press: (key: string) => Promise<void>;
}