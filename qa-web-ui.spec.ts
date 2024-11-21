// тест на отправку UI формы

const { test, expect, chromium } = require('@playwright/test');

test.only('automationintesting.online', async ({ page }) => {

    test.setTimeout(5000000);
 
    // Запуск браузера и переход на url сайта
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    page = await browser.newPage();
    await page.goto('https://automationintesting.online/');
    await page.waitForLoadState('networkidle');

    // Скроллинг вниз
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));

  // Заполнение формы с обработкой ошибок
  try {
    await page.getByTestId('ContactName').fill('test-user');
    await page.getByTestId('ContactEmail').fill('test@mail.ru');
    await page.getByTestId('ContactPhone').fill('79998887766');
    await page.getByTestId('ContactSubject').fill('test1234567');
    await page.getByTestId('ContactDescription').fill('Hi! How are you doing? I really want to get in touch with you');

    // нажатие на кнопку "Submit"
    await page.getByRole('button', { name: 'Submit' }).click();

    // Ожидание появления сообщения об успехе (ожидание появления заголовка h2)
    await page.waitForSelector('h2', { state: 'visible' });

    // Проверки сообщений об успехе 
    await expect(page.getByRole('heading', { name: 'Thanks for getting in touch' })).toBeVisible();
    await expect(page.getByText(/We'll get back to you/)).toBeVisible(); 
    await expect(page.getByText('as soon as possible.')).toBeVisible();

  } catch (error) {
    console.error('Ошибка при заполнении формы:', error);
    throw new Error('Ошибка при заполнении формы: ' + (error instanceof Error ? error.message : error)); 
  } finally {
    await browser.close();
  }
 
})
    // npx playwright test qa-web-ui.spec.ts
    
