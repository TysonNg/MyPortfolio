import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';

const CHROME_PATH = fs.existsSync('C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe')
  ? 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe'
  : 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';

const OUTPUT_DIR = path.resolve('public/projects/minisocial');
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function loginUser(page, email, password) {
  console.log(`Logging in ${email}...`);
  await page.goto('https://mini-social-fe.vercel.app/auth/signin', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);

  const emailInp = await page.$('input[type="email"], input[placeholder*="email" i]');
  if (emailInp) {
    await emailInp.click();
    await page.keyboard.type(email, { delay: 20 });
  }

  const passInp = await page.$('input[type="password"]');
  if (passInp) {
    await passInp.click();
    await page.keyboard.type(password, { delay: 20 });
  }

  await page.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const btn = btns.find(b => b.innerText && b.innerText.includes('Sign In'));
    if (btn) btn.click();
  });

  await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 15000 }).catch(() => {});
  await sleep(2000);
}

async function sendMessage(page, text) {
  console.log(`Sending message: "${text.slice(0, 30)}..."`);
  const ta = await page.$('textarea[placeholder*="message" i]');
  if (ta) {
    await ta.click();
    await page.keyboard.type(text, { delay: 15 });
    await sleep(600);

    const sent = await page.evaluate(() => {
      const sendBtn = document.querySelector('button[aria-label="Send message"]');
      if (sendBtn && !sendBtn.disabled) {
        sendBtn.click();
        return true;
      }
      return false;
    });
    console.log('Send button clicked:', sent);
    await sleep(2000);
  }
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  });

  // 1. User 1: Alex Rivers (page 1)
  console.log('1. User 1: Alex Rivers signing in...');
  const page1 = await browser.newPage();
  await loginUser(page1, 'usertest01@example.com', 'Password123!');

  // 2. User 2: Emma Watson (page 2 in separate context)
  console.log('2. User 2: Emma Watson signing in...');
  const context2 = await browser.createBrowserContext();
  const page2 = await context2.newPage();
  await page2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await loginUser(page2, 'emma.watson@example.com', 'Password123!');

  await sleep(3000);

  // 3. Emma opens chat box with Alex
  console.log('3. Emma opening chat with Alex...');
  await page2.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contact = btns.find(b => b.innerText && (b.innerText.includes('user_test_01') || b.innerText.includes('Alex')));
    if (contact) contact.click();
  });
  await sleep(1500);

  // Emma sends message
  await sendMessage(page2, 'Hey Alex! Just saw your new Da Nang travel photos, looks breathtaking! 🌅 Are you free this weekend?');

  // 4. Alex opens chat box with Emma
  console.log('4. Alex opening chat with Emma...');
  await page1.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button'));
    const contact = btns.find(b => b.innerText && (b.innerText.includes('emma') || b.innerText.includes('Emma')));
    if (contact) contact.click();
  });
  await sleep(1500);

  // Alex sends reply
  await sendMessage(page1, 'Hi Emma! Thanks so much! Yes, let grab coffee on Saturday afternoon around 3 PM! ☕✨');

  // Emma sends back confirmation
  await sendMessage(page2, 'Perfect! Looking forward to it! See you then! 🙌🎉');

  // 5. Capture Real-time Chat Screenshot on Emma's page
  console.log('5. Capturing realtime_chat.webp...');
  await page2.screenshot({ path: path.join(OUTPUT_DIR, 'realtime_chat.webp'), type: 'webp', quality: 95 });
  console.log('Captured realtime_chat.webp');

  // 6. Capture News Feed Screenshot
  console.log('6. Capturing news_feed.webp & thumb.webp...');
  // Close chat box on page 1
  await page1.evaluate(() => {
    const closeBtn = document.querySelector('button[class*="close" i], button:has(svg[data-icon="xmark"]), button');
    const x = Array.from(document.querySelectorAll('button')).find(b => b.innerText === 'x' || b.getAttribute('aria-label')?.includes('close'));
    if (x) x.click();
  });
  await sleep(1500);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'news_feed.webp'), type: 'webp', quality: 92 });
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'thumb.webp'), type: 'webp', quality: 92 });
  console.log('Captured news_feed.webp and thumb.webp');

  // 7. Post Detail Screenshot
  console.log('7. Capturing post_detail.webp...');
  await page1.evaluate(() => {
    const posts = Array.from(document.querySelectorAll('article, div[class*="post" i], div[class*="card" i]'));
    const post = posts.find(p => p.innerText && (p.innerText.includes('Hello MiniSocial') || p.innerText.includes('Da Nang')));
    if (post) post.click();
  });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'post_detail.webp'), type: 'webp', quality: 92 });
  console.log('Captured post_detail.webp');

  // 8. User Profile Screenshot
  console.log('8. Capturing user_profile.webp...');
  await page1.goto('https://mini-social-fe.vercel.app/profile', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'user_profile.webp'), type: 'webp', quality: 92 });
  console.log('Captured user_profile.webp');

  // 9. Mobile Responsive View
  console.log('9. Capturing mobile_view.webp...');
  await page1.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page1.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_view.webp'), type: 'webp', quality: 92 });
  console.log('Captured mobile_view.webp');

  await browser.close();
  console.log('ALL MINISOCIAL CAPTURES FINISHED SUCCESSFULLY!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
