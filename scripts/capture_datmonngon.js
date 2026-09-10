import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUTPUT_DIR = path.resolve('public/projects/datmonngon');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function run() {
  console.log('Launching browser from:', CHROME_PATH);
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
      '--window-size=1440,900',
    ],
    defaultViewport: {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1.5,
    },
  });

  const page = await browser.newPage();

  // -------------------------------------------------------------
  // PART 1: CUSTOMER VIEWS
  // -------------------------------------------------------------
  console.log('Navigating to Customer Portal...');
  await page.goto('https://demo.datmonngon.com/', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);

  // Click on "Đặt hàng online" or store branch card to go to full menu
  try {
    const clicked = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, a, div'));
      const onlineBtn = btns.find(b => b.textContent && b.textContent.includes('Đặt hàng online'));
      if (onlineBtn) {
        onlineBtn.click();
        return true;
      }
      return false;
    });
    console.log('Clicked Đặt hàng online:', clicked);
    await sleep(2500);
  } catch (e) {
    console.log('Online click error:', e.message);
  }

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'customer_menu.webp'), type: 'webp', quality: 92 });
  console.log('Captured customer_menu.webp');

  // Customer Mobile View
  console.log('Capturing Customer Mobile View...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('https://demo.datmonngon.com/customer', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'customer_mobile.webp'), type: 'webp', quality: 92 });
  console.log('Captured customer_mobile.webp');

  // Reset viewport for Manager
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });

  // -------------------------------------------------------------
  // PART 2: MANAGER LOGIN & PORTAL
  // -------------------------------------------------------------
  console.log('Navigating to Login (id.datmonngon.com)...');
  await page.goto('https://id.datmonngon.com/', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);

  // Type credentials
  const phoneInput = await page.$('input[type="tel"], input[placeholder*="điện thoại" i], input');
  if (phoneInput) {
    await phoneInput.click();
    await page.keyboard.type('0123456789', { delay: 30 });
  }

  const passInput = await page.$('input[type="password"]');
  if (passInput) {
    await passInput.click();
    await page.keyboard.type('123456789', { delay: 30 });
  }

  await sleep(500);
  // Click login
  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const loginBtn = btns.find(b => b.textContent && b.textContent.includes('Đăng nhập'));
    if (loginBtn) loginBtn.click();
  });

  console.log('Submitted login. Waiting for redirect...');
  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 25000 }).catch(() => {});
  await sleep(3000);

  // 1. Manager Dashboard - click "Tất cả" filter for populated stats
  console.log('Navigating to Manager Dashboard...');
  await page.goto('https://demo.datmonngon.com/manager/dashboard', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  try {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button, div, span'));
      const allTimeBtn = btns.find(b => b.textContent && b.textContent.trim() === 'Tất cả');
      if (allTimeBtn) allTimeBtn.click();
    });
    await sleep(1500);
  } catch (e) {}

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'manager_dashboard.webp'), type: 'webp', quality: 92 });
  console.log('Captured manager_dashboard.webp');

  // 2. Waiter / POS Table Grid
  console.log('Navigating to Waiter / Floor View...');
  await page.goto('https://demo.datmonngon.com/waiter', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'thumb.webp'), type: 'webp', quality: 92 });
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'waiter_pos.webp'), type: 'webp', quality: 92 });
  console.log('Captured waiter_pos.webp and thumb.webp');

  // Helper to open drawer and click menu
  async function openDrawerAndClick(mainText, subText) {
    // Click top left hamburger
    await page.evaluate(() => {
      const topBtn = document.querySelector('button, [class*="hamburger"], [class*="menu"]');
      const icons = Array.from(document.querySelectorAll('button'));
      const burger = icons.find(b => b.querySelector('svg') || (b.textContent && b.textContent.includes('Quản lý')));
      if (burger) burger.click();
    });
    await sleep(800);

    if (mainText) {
      await page.evaluate((text) => {
        const items = Array.from(document.querySelectorAll('*'));
        const target = items.find(el => el.textContent && el.textContent.trim() === text);
        if (target) target.click();
      }, mainText);
      await sleep(800);
    }

    if (subText) {
      await page.evaluate((text) => {
        const items = Array.from(document.querySelectorAll('*'));
        const target = items.find(el => el.textContent && el.textContent.trim() === text);
        if (target) target.click();
      }, subText);
      await sleep(1000);
    }

    // Close drawer if open by clicking overlay
    await page.evaluate(() => {
      const overlay = document.querySelector('.ant-drawer-mask, [class*="overlay"], [class*="mask"]');
      if (overlay) overlay.click();
      else {
        // click somewhere on the right
        const body = document.body;
      }
    });
    await sleep(1000);
  }

  // 3. Dishes
  console.log('Navigating to Dishes...');
  await openDrawerAndClick('Thực đơn', 'Món ăn');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'manager_dishes.webp'), type: 'webp', quality: 92 });
  console.log('Captured manager_dishes.webp');

  // 4. Tables & Floor Map
  console.log('Navigating to Tables Info / Sơ đồ...');
  await openDrawerAndClick('Bàn & QR', 'Thông tin bàn');
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'tables_map.webp'), type: 'webp', quality: 92 });
  console.log('Captured tables_map.webp');

  // 5. Kitchen Display System (KDS)
  console.log('Navigating to Kitchen Display System (KDS)...');
  await page.goto('https://demo.datmonngon.com/kitchen', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'kitchen_kds.webp'), type: 'webp', quality: 92 });
  console.log('Captured kitchen_kds.webp');

  await browser.close();
  console.log('All DatMonNgon captures completed successfully!');
}

run().catch((err) => {
  console.error('Capture script error:', err);
  process.exit(1);
});
