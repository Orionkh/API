// const { test, expect } = require('@playwright/test');
// import fs from 'fs';
// import { parse } from 'csv-parse';

// test('File Download, Read and Verify', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/download');
//     const csvDownloadLink = await page.$('a[href="download/BrowserStack - List of devices to test on.csv"]');
//     expect(csvDownloadLink).not.toBeNull();
//     const [download] = await Promise.all([
//         page.waitForEvent('download'),
//         csvDownloadLink?.click(), 
//     ]);
  
//     await download.saveAs('./downloads/' + download.suggestedFilename());
//     const filePath = './downloads/' + download.suggestedFilename();
//     const fileContent = fs.readFileSync(filePath, 'utf-8');

//     // Перевіряємо, чи вміст файлу містить шуканий текст
//     const searchText = 'Google Pixel 6,Mobile,Android,12';
//     expect(fileContent).toContain(searchText);

//     // Парсимо CSV-дані
//     parse(fileContent, {}, (err, output) => {
//         if (err) {
//             console.error('Error parsing CSV:', err);
//             return;
//         }
//         console.log('Parsed CSV data:', output);
//     });

//     // Видаляємо файл 
//     fs.unlinkSync(filePath);
// });