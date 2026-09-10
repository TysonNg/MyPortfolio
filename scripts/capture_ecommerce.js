import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUTPUT_DIR = path.resolve('public/projects/ecommerce');
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

  // 1. Homepage
  console.log('Navigating to Homepage...');
  let homeLoaded = false;
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      await page.goto('https://newshop-tyson.vercel.app/', { waitUntil: 'networkidle2', timeout: 35000 });
      await sleep(2500);
      const text = await page.evaluate(() => document.body.innerText);
      if (!text.includes('Global Error')) {
        homeLoaded = true;
        break;
      }
      console.log(`Homepage showed Global Error, retrying attempt ${attempt}...`);
      await sleep(2000);
    } catch (e) {
      console.log(`Attempt ${attempt} error:`, e.message);
      await sleep(2000);
    }
  }

  // Scroll down a bit and back up to trigger lazy image loading
  await page.evaluate(async () => {
    window.scrollBy(0, 350);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'thumb.webp'), type: 'webp', quality: 92 });
  console.log('Captured thumb.webp');

  // 2. Catalog / Products
  console.log('Navigating to Catalog...');
  await page.goto('https://newshop-tyson.vercel.app/products?page=1', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'catalog.webp'), type: 'webp', quality: 92 });
  console.log('Captured catalog.webp');

  // 3. Product Detail Page - pick a product with clear photo
  console.log('Navigating to Product Detail (Camera / Air Conditioner)...');
  // Click on the Polaroid or Air Conditioner product card
  const clickedProduct = await page.evaluate(() => {
    const cards = Array.from(document.querySelectorAll('a[href*="/products/"]'));
    const target = cards.find(c => c.textContent && (c.textContent.includes('Camera') || c.textContent.includes('Air Conditioner')));
    if (target) {
      target.click();
      return true;
    }
    return false;
  });

  if (clickedProduct) {
    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 20000 }).catch(() => {});
  } else {
    await page.goto('https://newshop-tyson.vercel.app/products/67d508dfca66c2383cf6f011/multigroomer-all-in-one-trimmer-series-5000-23-piece-mens-grooming-kit', { waitUntil: 'networkidle2', timeout: 30000 });
  }
  await sleep(2500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'detail.webp'), type: 'webp', quality: 92 });
  console.log('Captured detail.webp');

  // Add item to cart
  try {
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const cartBtn = btns.find((b) => b.textContent && b.textContent.includes('Add to cart'));
      if (cartBtn) cartBtn.click();
    });
    console.log('Clicked Add to cart');
    await sleep(1500);
  } catch (err) {
    console.error('Error clicking add to cart:', err);
  }

  // 4. Cart Page
  console.log('Navigating to Cart...');
  await page.goto('https://newshop-tyson.vercel.app/cart', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'cart.webp'), type: 'webp', quality: 90 });
  console.log('Captured cart.webp');

  // 5. Checkout Page
  console.log('Navigating to Checkout...');
  await page.goto('https://newshop-tyson.vercel.app/cart/checkout', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'checkout.webp'), type: 'webp', quality: 90 });
  console.log('Captured checkout.webp');

  // 6. Mobile View
  console.log('Capturing Mobile View...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('https://newshop-tyson.vercel.app/', { waitUntil: 'networkidle2', timeout: 30000 });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile.webp'), type: 'webp', quality: 90 });
  console.log('Captured mobile.webp');

  await browser.close();
  console.log('Finished capturing all screenshots successfully!');
}

run().catch((err) => {
  console.error('Capture script error:', err);
  process.exit(1);
});
