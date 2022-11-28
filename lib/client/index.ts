import { PlayWrightClient } from "./playwright/client-wrapper";
import { IClient, IClientConfig, IGetClient } from "./interfaces/i-client";

export class ClientsManager {
    private _clients: Map<string, IClient> = new Map();
    private _currentClient: IClient | undefined;
    private _createClient: (config: IClientConfig) => PlayWrightClient;

    constructor(createClient: (config: IClientConfig) => PlayWrightClient) {
        this._createClient = createClient;
    }

    async addClient(key: string, config: IClientConfig) {
        if(this._clients.has(key)) {
            throw new Error(`key ${key} for a client already taken`);
        }
        
        const client = this._createClient(config);

        await client.init();

        this._clients.set(key, client);

        this._currentClient = client;

        return client;
    }

    getClient(key: string) {
        const client = this._clients.get(key);

        if(!client) {
            throw Error(`client ${key} doesn\'t exist`);
        }

        return client;
    }

    async closeClient(key: string) {
        const client = this._clients.get(key);

        if (client) {
            await client.close();
        }
    }

    async closeAllClients() {
        for(let client of this._clients) {
            await client[1].close();
        }
    }

    getCurrentClient() {
        if(!this._currentClient) {
            throw new Error("current client is not set");
        }

        return this._currentClient;
    }
}

export const clientsManager = new ClientsManager((config: IClientConfig) => new PlayWrightClient(config));