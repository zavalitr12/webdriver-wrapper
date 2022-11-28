import { IElement } from "./i-element";

export interface IPage {
    goto: (url: string) => Promise<void>;
    close: () => Promise<void>;
    bringToFront: () => Promise<void>;
    locator: (selector: string) => IElement
}