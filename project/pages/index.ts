import { ClientsManager } from "../../lib/client";
import { Main } from "./main/main";
import { SearchResult } from "./search-result/search-result";


export function pageProvider(clientsManager: ClientsManager) {
    return {
        main: () => new Main(clientsManager),
        searchResult: () => new SearchResult(clientsManager)
    }
}