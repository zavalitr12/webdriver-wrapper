import { pageProvider } from "../pages"
import { clientsManager } from "../../lib/client";

const main = pageProvider(clientsManager).main();

export async function searchFor(value: string) {
    await main.input().type(value);
    await main.input().press("Enter");
}

export async function gotoMainPage() {
    await clientsManager.getCurrentClient().newPage("page1");
    await clientsManager.getCurrentClient().getCurrentPage().page.goto(main.url);
}