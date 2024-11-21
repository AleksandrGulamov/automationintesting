const { test, expect } = require('@playwright/test');

test('API Test - Send Form', async ({ request }) => {
 // Подготовить данные запроса
 const data = {
  name: 'test-user',
  email: 'test@mail.ru',
  phone: '79998887766',
  subject: 'test1234567',
  description: 'Hi! How are you doing? I really want to get in touch with you'
 };

 // Отправить POST-запрос на конечную точку API 
 try {
 const response = await request.post('https://automationintesting.online/message/', {
  data: JSON.stringify(data),
  headers: {
   'Content-Type': 'application/json'
  }
 });

 // Проверить статус ответа
 expect(response.status()).toBe(201);
 

 // Преобразовать тело ответа в JSON
 const json = await response.json();
} catch (error) {
  console.error('Ошибка при отправке запроса:', error);
  throw new Error('Ошибка при отправке запроса: ' + (error instanceof Error ? error.message : error));
}
});

// npx playwright test qa-web-api.spec.ts