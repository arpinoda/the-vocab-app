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
    test('Can see the login link', async () => {
        const selector = 'a.App-link';
        await page.waitForSelector(selector);
        const text = await page.getContentsOf(selector);
        expect(text).toEqual('Login With Google');
    });

    describe('When click oAuth login link', () => {
        test('URL matches expected oAuth provider url', async () => {
            const selector = 'a.App-link';
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

            expect(text).toEqual('Tap + above to add a word');
        });
    });

    describe('When word list is NOT empty', () => {
        test('Can see Word List Header', async () => {
            const buttonSelector = 'button';
                
            const word = 'test_word_list_header_' + new Date().getTime();
            const wordSelector = '[id=\"' + word + '\"] div';

            page.on('dialog', async dialog => {
                await dialog.accept(word);
            });

            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);

            await page.waitForSelector(wordSelector);
            const text = await page.getContentsOf('h3');
            expect(text).toEqual('My Words');
        });
    });
});