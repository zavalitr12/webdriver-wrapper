import { clientsManager } from "./lib/client";

export const mochaHooks = {
    async beforeAll() {

        await clientsManager.addClient("client1", {
            browser: "chromium",
            baseUrl: "https://google.com",
            headless: false,
            viewport: {
                height: 840,
                width: 1840
            }
        });
    },

    async afterAll() {
        console.log("after all")
        await clientsManager.closeAllClients();
    }
}