import { Page } from "@playwright/test";
import { IClientConfig } from "../interfaces/i-client";
import { IPage } from "../interfaces/i-page";
import { PlayWrightElement } from "./element-wrapper";

export class PlayWrightPage implements IPage {
    private _page: Page;
    private _baseUrl: string;

    constructor(page: Page, config: IClientConfig) {
        this._page = page;
        this._baseUrl = config.baseUrl;
    }

    async goto(url: string) {
        this._page.goto(this._baseUrl + url);
    };

    async close() {
        this._page.close();
    }

    async bringToFront() {
        this._page.bringToFront();
    }

    locator(selector: string) {
        return new PlayWrightElement(this._page.locator(selector));
    }
}