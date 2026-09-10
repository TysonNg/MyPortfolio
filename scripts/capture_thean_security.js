import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUTPUT_DIR = path.resolve('public/projects/thean-security');
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

  // 1. Homepage Hero Banner & Introduction
  console.log('1. Navigating to Homepage (https://baovethean.com/)...');
  await page.goto('https://baovethean.com/', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);

  // Scroll down a bit and back up to trigger lazy images
  await page.evaluate(async () => {
    window.scrollBy(0, 300);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await sleep(1500);

  await page.screenshot({ path: path.join(OUTPUT_DIR, 'thumb.webp'), type: 'webp', quality: 92 });
  console.log('Captured thumb.webp');

  // 2. Services Overview
  console.log('2. Navigating to Services (https://baovethean.com/dich-vu)...');
  await page.goto('https://baovethean.com/dich-vu', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.evaluate(async () => {
    window.scrollBy(0, 300);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'services.webp'), type: 'webp', quality: 92 });
  console.log('Captured services.webp');

  // 3. Service Detail (Bảo vệ tại TP.HCM)
  console.log('3. Navigating to Service Detail (https://baovethean.com/dich-vu/bao-ve-tphcm)...');
  await page.goto('https://baovethean.com/dich-vu/bao-ve-tphcm', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.evaluate(async () => {
    window.scrollBy(0, 250);
    await new Promise((r) => setTimeout(r, 600));
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'service_detail.webp'), type: 'webp', quality: 92 });
  console.log('Captured service_detail.webp');

  // 4. Contact & Consultation Form
  console.log('4. Navigating to Contact (https://baovethean.com/lien-he)...');
  await page.goto('https://baovethean.com/lien-he', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.evaluate(async () => {
    window.scrollBy(0, 200);
    await new Promise((r) => setTimeout(r, 500));
    window.scrollTo(0, 0);
  });
  await sleep(1500);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'contact_quote.webp'), type: 'webp', quality: 92 });
  console.log('Captured contact_quote.webp');

  // 5. Mobile Responsive View
  console.log('5. Capturing Mobile View...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page.goto('https://baovethean.com/', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_view.webp'), type: 'webp', quality: 92 });
  console.log('Captured mobile_view.webp');

  await browser.close();
  console.log('ALL THE AN SECURITY CAPTURES FINISHED SUCCESSFULLY!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
