/**
 * Header & navigation (oAuth) integration tests, authenticated & unauth states.
 */

const Page = require('./helpers/page');

const PAGE_URL = 'http://localhost:3000';
let page;

beforeEach(async () => {
    page = await Page.build();
    await page.goto(PAGE_URL);
});

afterEach(async () => {
    await page.close();
});

describe('When not logged in', () => {
    test('Can see the Google login button', async () => {
        const selector = 'button.google-strategy span';
        await page.waitForSelector(selector);
        const text = await page.getContentsOf(selector);
        expect(text).toEqual('Login with Google');
    });

    describe('When click oAuth login link', () => {
        test('URL matches expected oAuth provider url', async () => {
            const selector = 'button.google-strategy';
            await page.waitForSelector(selector);
            await page.click(selector);
            const url = await page.url();
            expect(url).toMatch('/accounts\.google\.com/');    
        });
    });

});

describe('When logged in', () => {

    beforeEach(async () => {
        await page.login();
    });

    test('Can see logout link', async () => {    
        const selector = 'a[href="/auth/logout"]';
        const text = await page.getContentsOf(selector);
        expect(text).toEqual('Log Out');
    });

    describe('When word list is empty', () => {
        test('Can see New Word Instruction', async () => {
            const selector = '.instruction .subtitle';
            await page.waitForSelector(selector);
            const text = await page.getContentsOf(selector);

            expect(text).toEqual('Add a word to get started 🤓');
        });
    });
});