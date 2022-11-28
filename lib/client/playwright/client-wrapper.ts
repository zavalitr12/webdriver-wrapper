import { BrowserContext, chromium, firefox } from "@playwright/test";
import { IClient, IClientConfig } from "../interfaces/i-client";
import { IPage } from "../interfaces/i-page";
import { PlayWrightPage } from "./page-wrapper";

export class PlayWrightClient implements IClient {
    private _browser: BrowserContext | undefined;
    private _config: IClientConfig;
    private _currentPage: { key: string; page: IPage } | undefined;
    private _pages: Map<string, IPage> = new Map();

    constructor(config: IClientConfig) {
        this._config = config;
    }

    async init() {
        if (this._browser) {
            return;
        }

        const browsers = {
            chromium,
            firefox
        }
    
        const browser = await browsers[this._config.browser].launch({ headless: this._config.headless });
    
        this._browser = await browser.newContext({ viewport: this._config.viewport });
    }

    getCurrentPage() {
        if (!this._currentPage) {
            throw new Error("current page is not set");
        }
        return this._currentPage;
    }

    async newPage(key: string) {
        if (!this._browser) {
            throw new Error("Browser is not initialized. Make sure to call mathod init.");
        }

        if (Array.from(this._pages.keys()).find(item => item === key) !== undefined)
            throw new Error(`key ${key} is already taken`);

        const page = new PlayWrightPage(await this._browser.newPage(), this._config);

        this._pages.set(key, page);

        this._currentPage = { key, page };
    }

    async closeCurrentPage() {
        const currentPage = this._currentPage;

        if(!currentPage) {
            return;
        }

        await currentPage.page.close();

        const keys = Array.from(this._pages.keys());

        
        // used find to break out of the loop when hit needed page in pages
        keys.find((key, index) => {
            if (key === currentPage.key) {
                // set current next tab if exists else set previous if exists
                const nextKey = keys[index + 1];
                const prevKey = keys[index - 1];
                if (nextKey) {
                    this._currentPage = { key: nextKey, page: this._pages.get(nextKey) as PlayWrightPage };
                } else if (prevKey) {
                    this._currentPage = { key: prevKey, page: this._pages.get(prevKey) as PlayWrightPage }
                } else {
                    this._currentPage = undefined;
                }

                // delete closed page
                this._pages.delete(key);

                return true;
            }
        });
    }

    async selectPage(key: string) {
        const page = this._pages.get(key);

        if (!page)
            throw new Error(`page ${key} doesn\'t exist`);

        this._currentPage = { key, page };

        await this._currentPage.page.bringToFront();
    }

    async close() {
        if (!this._browser) {
            throw new Error("Browser is not initialized. Make sure to call mathod init.");
        }

        for(let page of this._pages) {
            await page[1].close();
        }

        await this._browser.close();
    }
}