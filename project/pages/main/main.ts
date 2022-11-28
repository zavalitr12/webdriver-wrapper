import { ClientsManager } from "../../../lib/client";

export class Main {
    private _clientManager: ClientsManager;
    private _url: string = "/";

    constructor(clientManager: ClientsManager) {
        this._clientManager = clientManager;
    }

    private _currentLocator(selector: string) {
        return this._clientManager.getCurrentClient().getCurrentPage().page.locator(selector);
    }

    input() {
        return this._currentLocator("input[title='Поиск']");
    }

    get url() {
        return this._url;
    }

}