import { Locator } from "@playwright/test";
import { IElement } from "../interfaces/i-element";

export class PlayWrightElement implements IElement {
    private _locator: Locator;

    constructor(page: Locator) {
        this._locator = page;
    }

    async click() {
        await this._locator.click();
    }

    
    async type(value: string) {
        await this._locator.type(value);
    }
    
    async inputValue() {
        return this._locator.inputValue();
    }

    
    async innerText() {
        return this._locator.innerText();
    }

    
    async textContent() {
        return this._locator.textContent();
    }

    async press(key: string) {
        await this._locator.press(key);
    }
}