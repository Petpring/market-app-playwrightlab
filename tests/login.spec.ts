import { test, expect } from '@playwright/test';

test('TC01 Login สำเร็จ', async ({ page }) => {
// 1. เปิดหน้า Login
await page.goto('http://localhost:5173/');
// 2. กรอกหมายเลขโทรศัพท์
await page
  .getByLabel('หมายเลขโทรศัพท์มือถือ')
  .fill('0800000000');
// 3. กรอกรหัสผ่าน
await page
  .getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
  .fill('uCrwVaBW39o_0G0Q5QwAVrqr');
// 4. กดปุ่มเข้าสู่ระบบ
await page
  .getByRole('button', { name: 'เข้าสู่ระบบ' })
  .click();
// 5. ตรวจสอบว่า Login สำเร็จ และมีค าว่า ยินดีต้อนรับ
await expect(page.getByText('ยินดีต้อนรับ')).toBeVisible();
});


// test('has title', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Expect a title "to contain" a substring.
//   await expect(page).toHaveTitle(/Playwright/);
// });

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
