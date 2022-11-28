import { Locator } from "@playwright/test/types/test";
import { IPage } from "./i-page";

export type BrowserTypes = "chromium" | "firefox";

export interface IClientConfig {
    browser: BrowserTypes;
    baseUrl: string;
    headless: boolean;
    viewport: {
        width: number;
        height: number;
    }
}

export interface IClient {
    getCurrentPage: () => { key: string; page: IPage };
    newPage: (key: string) => Promise<void>;
    closeCurrentPage: () => Promise<void>;
    selectPage: (key: string) => Promise<void>;
    close: () => Promise<void>;
}

export type IGetClient = (config: IClientConfig) => Promise<IClient>;