const { test, expect } = require('@playwright/test');

const loginData = [
    {
        email: "studigradilyagmail.com",
        pass: "1w24r231jr",
        result: "Invalid email address",
        locator: `//li[@class="validation-messages__item ng-star-inserted"]`
    },
    {
        email: "studigradilya@gmail.com",
        pass: "1w24r231jr",
        result: "Incorrect email or password",
        locator: `//p[@class="page-login__actions-validation ng-star-inserted"]`
    }
];

test('Login Test', async ({ page }) => {
    // Проходимо по кожному елементу з набору тестових даних
    for (const data of loginData) {
        // Відкриваємо сторінку логіну
        await page.goto('https://lms.ithillel.ua/login');

        // Вводимо email та пароль
        await page.fill('input[type="email"]', data.email);
        await page.fill('input[type="password"]', data.pass);

        // Клацнемо на кнопку увійти
        await page.click('button[type="submit"]');

        // Очікуємо відображення результату
        await page.waitForSelector(data.locator);

        // Перевіряємо, чи відображається очікуваний текст
        const text = await page.textContent(data.locator);
        expect(text).toContain(data.result);
    }
});
