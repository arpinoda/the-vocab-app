/**
 * CRUD integration tests against /api/words, authenticated & unauth states
 */

const Page = require('./helpers/page');

let page;
const PAGE_URL = 'http://localhost:3000';

beforeEach(async () => {
    page = await Page.build();
    await page.goto(PAGE_URL);
});

afterEach(async () => {
    await page.close();
});

describe('When NOT logged in', () => {
    test('Creating a word results in an error', async () => {
        const word = `word_should_not_save_${new Date().getTime()}`;
        const result = await page.post('/api/words', { word });

        expect(result).toEqual({ error: 'You must be logged in' });
    });

    test('Viewing a Word list results in an error', async () => {
        const result = await page.get('/api/words');

        expect(result).toEqual({ error: 'You must be logged in' });
    });

    test('Deleting a word results in an error', async () => {
        const id = '606b89b378e8c244c2e8b7f6';
        const result = await page.delete('/api/words', { id });

        expect(result).toEqual({ error: 'You must be logged in' });
    });
});

describe('When logged in', () => {
    beforeEach(async () => {
        await page.login();
    });

    describe('When click "Add New Word" button', () => {
        test('Can see window.prompt message', async () => {
            const selector = 'button';
            let dialogMessage;

            page.on('dialog', async dialog => {
                dialogMessage = dialog.message();
                await dialog.dismiss();
            });

            await page.waitForSelector(selector);
            await page.click(selector);

            expect(dialogMessage).toEqual('Please add a word below');
        });

        describe('When using valid input', () => {
            test('Clicking "OK" adds new word to the list', async () => {
                const buttonSelector = '[id="btn-new-word"]';
                
                const word = 'test_word_valid_input_' + new Date().getTime();
                const wordSelector = '[data-value=\"' + word + '\"]';

                page.on('dialog', async dialog => {
                    await dialog.accept(word);
                });
    
                await page.waitForSelector(buttonSelector);
                await page.click(buttonSelector);

                await page.waitForSelector(wordSelector);
                const text = await page.getContentsOf(wordSelector);
                expect(text).toEqual(word);
            });
        });

        describe('When using empty input', () => {
            test('Clicking "OK" causes NO network request', async () => {
                const buttonSelector = 'button';
                const word = '';

                let requestCount = 0;

                page.on('request', () => {
                    requestCount += 1;
                });

                page.on('dialog', async dialog => {
                    await dialog.accept(word);
                });
    
                await page.waitForSelector(buttonSelector);
                await page.click(buttonSelector);

                expect(requestCount).toEqual(0);
            });
        });

        describe('When using existing word', () => {
            test('Issuing a POST request returns an error', async () => {
                const word = 'test_word_existing_' + new Date().getTime();
                await page.post('/api/words', { word });
                const result = await page.post('/api/words', { word });                

                expect(result).toEqual({ error: `${word} already exists. Save failed` });
            });
        });
    });

    describe('When word list is NOT empty', () => {
        test('Can delete existing word', async () => {
            const word = 'test_word_valid_input_' + new Date().getTime();
            const wordSelector = '[data-value=\"' + word + '\"]';
            
            const buttonSelector = '[id="btn-new-word"]';
            
            // Create the new word via GUI
            page.on('dialog', async dialog => {
                await dialog.accept(word);
            });

            await page.waitForSelector(buttonSelector);
            await page.click(buttonSelector);

            await page.waitForSelector(wordSelector);

            // Delete the word
            const deleteSelector = '[data-value=\"delete-' + word + '\"]';
            await page.click(deleteSelector);

            await page.waitForTimeout(500);
            await page.waitForSelector(deleteSelector, { hidden: true});

            try {
                await page.getContentsOf(deleteSelector);
            } catch (error) {
                expect(error.message).toMatch('failed to find element matching selector');
            }

        });
    });
});