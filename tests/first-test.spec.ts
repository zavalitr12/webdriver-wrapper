import { I } from "../project/flows";

describe('group of tests 1', () => {
    it.only('test 1', async function () {
        const searchValue = "google";

        await I.gotoMainPage();

        await I.searchFor(searchValue);

        await I.checkSearchResult(searchValue);

        await new Promise(res => setTimeout(res, 2000));
    });
});