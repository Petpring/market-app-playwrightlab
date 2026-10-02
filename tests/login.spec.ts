import { test, expect } from '@playwright/test';

test('TC01 Login เจ้าของตลาด สำเร็จ', async ({ page }) => {
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

test('TC02 Login เจ้าของตลาด ใส่เบอร์โทรศัพท์ไม่ถูกต้อง', async ({ page }) => {
// 1. เปิดหน้า Login
await page.goto('http://localhost:5173/');
// 2. กรอกหมายเลขโทรศัพท์
await page
  .getByLabel('หมายเลขโทรศัพท์มือถือ')
  .fill('0810010000');
// 3. กรอกรหัสผ่าน
await page
  .getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
  .fill('uCrwVaBW39o_0G0Q5QwAVrqr');
// 4. กดปุ่มเข้าสู่ระบบ
await page
  .getByRole('button', { name: 'เข้าสู่ระบบ' })
  .click();
// 5. ตรวจสอบว่า Login ไม่สำเร็จ และมีคำว่า หมายเลขโทรศัพท์ไม่ถูกต้อง
await expect(page.getByText('หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง')).toBeVisible();
});


test('TC03 Login เจ้าของตลาด ใส่รหัสผ่านไม่ถูกต้อง', async ({ page }) => {
// 1. เปิดหน้า Login
await page.goto('http://localhost:5173/');
// 2. กรอกหมายเลขโทรศัพท์
await page
  .getByLabel('หมายเลขโทรศัพท์มือถือ')
  .fill('0800000000');
// 3. กรอกรหัสผ่าน
await page
  .getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
  .fill('uCrwVaBW39o_0G0Q5QwAVrqr123');
// 4. กดปุ่มเข้าสู่ระบบ
await page
  .getByRole('button', { name: 'เข้าสู่ระบบ' })
  .click();
// 5. ตรวจสอบว่า Login ไม่สำเร็จ และมีคำว่า รหัสผ่านไม่ถูกต้อง
await expect(page.getByText('หมายเลขโทรศัพท์หรือรหัสผ่านไม่ถูกต้อง')).toBeVisible();
});


test('TC04 Login เจ้าของตลาด ไม่กรอกข้อมูลใดๆ', async ({ page }) => {
    // 1. เปิดหน้า Login
    await page.goto('http://localhost:5173/');

    // 2. กดปุ่มเข้าสู่ระบบทันทีโดยไม่กรอกข้อมูล
    await page.getByRole('button', { name: 'เข้าสู่ระบบ' }).click();

    // 3. เช็คว่าช่องเบอร์โทรศัพท์ติดสถานะ valueMissing (ยังไม่ได้กรอก)
    const isPhoneInvalid = await page
      .getByLabel('หมายเลขโทรศัพท์มือถือ')
      .evaluate((element: HTMLInputElement) => element.validity.valueMissing);

    expect(isPhoneInvalid).toBe(true);
  });

  test('TC05 Login เจ้าของตลาด กรอกเบอร์โทรศัพท์ผิดรูปแบบ ', async ({ page }) => {
    const phoneInput = page.getByLabel('หมายเลขโทรศัพท์มือถือ');
        // 1. เปิดหน้า Login
    await page.goto('http://localhost:5173/');
    // 2. กรอกหมายเลขโทรศัพท์
    await page
      .getByLabel('หมายเลขโทรศัพท์มือถือ')
      .fill('080000');
    // 3. กรอกรหัสผ่าน
    await page
      .getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
      .fill('uCrwVaBW39o_0G0Q5QwAVrqr123');
    // 4. กดปุ่มเข้าสู่ระบบ
    await page
      .getByRole('button', { name: 'เข้าสู่ระบบ' })
      .click();
      // 1. เช็คสถานะ patternMismatch ว่าติด Error จริง (ใช้ได้ทุก Browser)
    const isPatternMismatch = await phoneInput.evaluate(
      (element: HTMLInputElement) => element.validity.patternMismatch
    );
    expect(isPatternMismatch).toBe(true);

    // 2. เช็คว่ามีข้อความ Validation ปรากฏออกมา (เช็คแค่ว่าไม่เป็นค่าว่าง)
    const validationMessage = await phoneInput.evaluate(
      (element: HTMLInputElement) => element.validationMessage
    );
    expect(validationMessage).not.toBe('');
  });

  test('TC06 Login เจ้าของตลาด กรอกรหัสผ่านน้อยกว่า 8 ตัวอักษร ', async ({ page }) => {
    const passwordInput = page.getByPlaceholder('อย่างน้อย 8 ตัวอักษร');
        // 1. เปิดหน้า Login
    await page.goto('http://localhost:5173/');
    // 2. กรอกหมายเลขโทรศัพท์
    await page
      .getByLabel('หมายเลขโทรศัพท์มือถือ')
      .fill('0800000000');
    // 3. กรอกรหัสผ่าน
    await page
      .getByPlaceholder('อย่างน้อย 8 ตัวอักษร')
      .fill('1234');
    // 4. กดปุ่มเข้าสู่ระบบ
    await page
      .getByRole('button', { name: 'เข้าสู่ระบบ' })
      .click();
    // 1. เช็คสถานะ tooShort ว่าติด Error จริง (ใช้ได้ทุก Browser)
    const isTooShort = await passwordInput.evaluate(
      (element: HTMLInputElement) => element.validity.tooShort
    );
    expect(isTooShort).toBe(true);

    // 2. เช็คว่าข้อความแจ้งเตือนมีตัวเลข 8 อยู่ในข้อความ (คลอบคลุมทั้ง Chromium, Firefox, WebKit)
    const validationMessage = await passwordInput.evaluate(
      (element: HTMLInputElement) => element.validationMessage
    );
    expect(validationMessage).toContain('8');
  });
