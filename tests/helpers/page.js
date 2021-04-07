const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

/**
 * Allows us to interface with all browser automation aspects of our test suite.
 * Specifically, we use a Proxy to combine access to methods & properties within
 * CustomPage, Page, and Browser objects.
 */

class CustomPage {

    static async build() {
        // Preferred way of creating new instances. CustomPage now 
        // encapulates ALL logic for creating page, browser, and proxy

        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox'],
        });

        const page = await browser.newPage();
        const customPage = new CustomPage(page);
        
        return new Proxy(customPage, {
            get: function(target, property) {
                return customPage[property] || browser[property]
                 || page[property];
            },
        });
    }

    constructor(page) {
        this.page = page;
    }

    async login() {
        const user = await userFactory();
        const { session, sig } = sessionFactory(user);
        
        // Set the session and signature as cookies on our Page instance
        await this.page.setCookie({ name: 'express:sess', value: session });
        await this.page.setCookie({ name: 'express:sess.sig', value: sig });
        await this.page.reload();
        await this.page.waitForTimeout(200);
    }

    on(param, callback) {
        this.page.on(param, callback);
    }

    getContentsOf(selector) {
        return this.page.$eval(selector, el => el.innerHTML);
    }

    get(path) {
        return this.fetch(path, { dataObj: null, method: 'GET' } );
    }

    post(path, dataObj) {
        return this.fetch(path, { dataObj, method: 'POST' });
    }

    delete(path, dataObj) {
        return this.fetch(path, { dataObj, method: 'DELETE' });
    }

    fetch(path, { dataObj, method }) {
        return this.page.evaluate((_path, _data, _method) => {
            return fetch(_path, {
                method: _method,
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: (_data) ? JSON.stringify(_data) : null
            }).then(res => res.json());
        }, path, dataObj, method);
    }
}

module.exports = CustomPage;