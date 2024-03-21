import { test, expect } from '@playwright/test';
import { Browser, Page, chromium } from 'playwright';

class SingletonPage {
    private static instance: SingletonPage;
    private browser: Browser | null = null;
    private page: Page | null = null;

    private constructor() { }

    public static async getInstance(): Promise<SingletonPage> {
        if (!SingletonPage.instance) {
            SingletonPage.instance = new SingletonPage();
            await SingletonPage.instance.init();
        }
        return SingletonPage.instance;
    }

    private async init() {
        this.browser = await chromium.launch();
        this.page = await this.browser.newPage();
    }

    public async getPage(): Promise<Page> {
        if (!this.page) {
            throw new Error('Page instance is not initialized.');
        }
        return this.page;
    }

    public async close() {
        await this.browser?.close();
    }
}

test('Singleton Page Test', async () => {
    const singletonPage1 = await SingletonPage.getInstance();
    const singletonPage2 = await SingletonPage.getInstance();

    expect(singletonPage1).toBe(singletonPage2);

    const page = await singletonPage1.getPage();
    await page.goto('https://the-internet.herokuapp.com/');
    // Perform test actions with the page instance
    await page.click('//*[@id="content"]/ul/li[1]/a');
    await page.pause()
    await singletonPage1.close();
});
