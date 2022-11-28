import { ClientsManager } from "../../../lib/client";

export class SearchResult {
    private _clientManager: ClientsManager;

    
    constructor(clientManager: ClientsManager) {
        this._clientManager = clientManager;
    }
    
    private _currentLocator() {
        return this._clientManager.getCurrentClient().getCurrentPage().page.locator.bind(this._clientManager.getCurrentClient().getCurrentPage().page);
    }

    searchResultItem(item: number) {
        return this._currentLocator()(`xpath=//body/descendant::h3[@class='LC20lb MBeuO DKV0Md'][${item}]`);
    }
}