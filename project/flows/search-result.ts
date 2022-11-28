import { expect } from "chai";
import { clientsManager } from "../../lib/client";
import { pageProvider } from "../pages";

const searchResult = pageProvider(clientsManager).searchResult();

export async function checkSearchResult(value: string) {
    const result = await searchResult.searchResultItem(1).textContent();

    expect(result).to.contain(value);
}