import { expect } from "chai";
import { clientsManager } from "../lib/client";

const wait = () => new Promise(res => setTimeout(res, 1000));

describe('group of tests 2', () => {
    it('test 2', async function () {

        const client = clientsManager.getCurrentClient();

        const page1 = await client.newPage("page1");
        const page2 = await client.newPage("page2");
        const page3 = await client.newPage("page3");

        await wait();

        expect(client.getCurrentPage().key).to.eq("page3");

        await client.selectPage("page2");

        expect(client.getCurrentPage().key).to.eq("page2");

        await wait();

        await client.closeCurrentPage();

        expect(client.getCurrentPage().key).to.eq("page3");
        
        await wait();
        
        await client.closeCurrentPage();

        expect(client.getCurrentPage().key).to.eq("page1");
        
        await wait();
        
        await client.closeCurrentPage();

        expect(client.getCurrentPage()).to.eq(undefined)

        await wait();
    });
});