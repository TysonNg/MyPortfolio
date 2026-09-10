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

async function registerOrLogin(page, username, email, password, displayName, bio) {
  console.log(`Setting up account: ${username} (${email})...`);
  await page.goto('https://mini-social-fe.vercel.app/auth/signup', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);

  // Try signing up
  try {
    const userInp = await page.$('#signup-username, input[placeholder*="alex_doe" i]');
    if (userInp) {
      await userInp.click();
      await page.keyboard.type(username, { delay: 20 });
    }

    const emailInp = await page.$('#signup-email, input[placeholder*="name@domain.com" i]');
    if (emailInp) {
      await emailInp.click();
      await page.keyboard.type(email, { delay: 20 });
    }

    const passInp = await page.$('#signup-password, input[placeholder*="password" i]');
    if (passInp) {
      await passInp.click();
      await page.keyboard.type(password, { delay: 20 });
    }

    await sleep(500);
    // Click Create Account
    await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const btn = btns.find(b => b.innerText && b.innerText.includes('Create Account'));
      if (btn) btn.click();
    });

    await page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 8000 }).catch(() => {});
    await sleep(2000);
  } catch (e) {
    console.log(`Signup error (maybe already exists): ${e.message}`);
  }

  // If still on auth page, sign in
  if (page.url().includes('/auth')) {
    console.log(`Signing into ${email}...`);
    await page.goto('https://mini-social-fe.vercel.app/auth/signin', { waitUntil: 'networkidle2', timeout: 35000 });
    await sleep(1500);

    const loginEmail = await page.$('#login-email, input[type="email"], input[placeholder*="email" i]');
    if (loginEmail) {
      await loginEmail.click();
      await page.keyboard.type(email, { delay: 20 });
    }

    const loginPass = await page.$('#login-password, input[type="password"]');
    if (loginPass) {
      await loginPass.click();
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

  // Set Profile Name & Bio
  if (displayName || bio) {
    try {
      await page.goto('https://mini-social-fe.vercel.app/profile', { waitUntil: 'networkidle2', timeout: 25000 });
      await sleep(1500);

      if (displayName) {
        const nameInput = await page.$('input[placeholder*="Name" i], input[type="text"]');
        if (nameInput) {
          await nameInput.click({ clickCount: 3 });
          await page.keyboard.press('Backspace');
          await page.keyboard.type(displayName, { delay: 20 });
        }
      }

      if (bio) {
        const bioInput = await page.$('textarea');
        if (bioInput) {
          await bioInput.click({ clickCount: 3 });
          await page.keyboard.press('Backspace');
          await page.keyboard.type(bio, { delay: 20 });
        }
      }

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const saveBtn = btns.find(b => b.innerText && b.innerText.includes('Save changes'));
        if (saveBtn) saveBtn.click();
      });
      await sleep(1500);
    } catch (e) {
      console.log('Profile edit error:', e.message);
    }
  }

  console.log(`Account ready: ${username}, current URL: ${page.url()}`);
}

async function createPost(page, text) {
  console.log(`Creating post: "${text.slice(0, 30)}..."`);
  await page.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);

  // Click How're you today
  const opened = await page.evaluate(() => {
    const postBox = Array.from(document.querySelectorAll('*')).find(el => el.innerText && el.innerText.includes("How're you today?"));
    if (postBox) {
      postBox.click();
      return true;
    }
    return false;
  });

  if (opened) {
    await sleep(1000);
    const textarea = await page.$('textarea');
    if (textarea) {
      await textarea.click();
      await page.keyboard.type(text, { delay: 15 });
      await sleep(500);

      await page.evaluate(() => {
        const btns = Array.from(document.querySelectorAll('button'));
        const postBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Post');
        if (postBtn) postBtn.click();
      });
      await sleep(2500);
    }
  }
}

async function run() {
  const browser = await puppeteer.launch({
    executablePath: CHROME_PATH,
    headless: 'new',
    args: ['--no-sandbox', '--window-size=1440,900'],
    defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 1.5 },
  });

  // USER 1: Alex Rivers
  const page1 = await browser.newPage();
  await registerOrLogin(page1, 'alex_rivers', 'alex.rivers@example.com', 'Password123!', 'Alex Rivers', 'Passionate traveler, coffee lover, and digital creator.');
  await createPost(page1, 'Golden hour in Da Nang! 🌅 Traveling with friends is always the best way to recharge and find new inspiration. #wanderlust #weekendvibes');

  // USER 2: Emma Watson
  const context2 = await browser.createBrowserContext();
  const page2 = await context2.newPage();
  await page2.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await registerOrLogin(page2, 'emma_watson', 'emma.watson@example.com', 'Password123!', 'Emma Watson', 'Photography enthusiast & book lover. Chasing sunsets and cozy cafes.');
  await createPost(page2, 'Cozy afternoon coffee & catching up on favorite books. Have a wonderful and relaxing weekend everyone! ☕✨');

  // USER 3: David Beckham
  const context3 = await browser.createBrowserContext();
  const page3 = await context3.newPage();
  await page3.setViewport({ width: 1440, height: 900, deviceScaleFactor: 1.5 });
  await registerOrLogin(page3, 'david_b', 'david.b@example.com', 'Password123!', 'David Beckham', 'Fitness, weekend football & good food.');

  // Follow Alex Rivers from Emma
  console.log('Emma searching and following Alex Rivers...');
  await page2.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);

  // Search alex_rivers
  const searchInput = await page2.$('input[placeholder*="Search" i]');
  if (searchInput) {
    await searchInput.click();
    await page2.keyboard.type('alex_rivers', { delay: 30 });
    await sleep(1500);

    // Click on search result
    await page2.evaluate(() => {
      const results = Array.from(document.querySelectorAll('*'));
      const target = results.find(el => el.innerText && el.innerText.includes('Alex Rivers'));
      if (target) target.click();
    });
    await sleep(2500);

    // Click Follow button
    await page2.evaluate(() => {
      const btns = Array.from(document.querySelectorAll('button'));
      const followBtn = btns.find(b => b.innerText && b.innerText.trim() === 'Follow');
      if (followBtn) followBtn.click();
    });
    await sleep(1500);
  }

  // Emma like and comment on Alex's post
  console.log('Emma liking and commenting on feed...');
  await page2.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);

  // Like first post
  await page2.evaluate(() => {
    const heartBtns = Array.from(document.querySelectorAll('button, svg'));
    const heart = heartBtns.find(b => b.getAttribute('aria-label')?.includes('like') || b.querySelector('svg'));
    if (heart) heart.click();
  });
  await sleep(1000);

  // Click on post or comment icon
  await page2.evaluate(() => {
    const commentBtns = Array.from(document.querySelectorAll('button'));
    const commentBtn = commentBtns.find(b => b.innerText && b.innerText.includes('Comment'));
    if (commentBtn) commentBtn.click();
  });
  await sleep(1500);

  // -------------------------------------------------------------
  // REAL-TIME CHAT INTERACTION
  // -------------------------------------------------------------
  console.log('Setting up real-time chat between Alex and Emma...');
  // From Emma's side, open Messages
  await page2.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);

  // Click messages button / chat icon
  await page2.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const chatBtn = btns.find(b => b.querySelector('svg[class*="message" i]') || b.getAttribute('aria-label')?.includes('Message') || (b.innerText && b.innerText.includes('Message')));
    if (chatBtn) chatBtn.click();
  });
  await sleep(1500);

  // If chat panel opened or on messages page, click on Alex Rivers contact
  await page2.evaluate(() => {
    const contacts = Array.from(document.querySelectorAll('*'));
    const alex = contacts.find(el => el.innerText && el.innerText.includes('Alex Rivers'));
    if (alex) alex.click();
  });
  await sleep(1500);

  // Send message from Emma to Alex
  try {
    const chatInput = await page2.$('input[placeholder*="message" i], textarea[placeholder*="message" i], input[type="text"]');
    if (chatInput) {
      await chatInput.click();
      await page2.keyboard.type('Hey Alex! How are you doing today? Just saw your Da Nang photo, looks breathtaking!', { delay: 20 });
      await page2.keyboard.press('Enter');
      await sleep(1500);
    }
  } catch (e) {
    console.log('Chat send error:', e.message);
  }

  // Alex replies to Emma
  await page1.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);
  await page1.evaluate(() => {
    const btns = Array.from(document.querySelectorAll('button, a'));
    const chatBtn = btns.find(b => b.querySelector('svg[class*="message" i]') || b.getAttribute('aria-label')?.includes('Message') || (b.innerText && b.innerText.includes('Message')));
    if (chatBtn) chatBtn.click();
  });
  await sleep(1500);
  await page1.evaluate(() => {
    const contacts = Array.from(document.querySelectorAll('*'));
    const emma = contacts.find(el => el.innerText && el.innerText.includes('Emma Watson'));
    if (emma) emma.click();
  });
  await sleep(1500);

  try {
    const chatInput1 = await page1.$('input[placeholder*="message" i], textarea[placeholder*="message" i], input[type="text"]');
    if (chatInput1) {
      await chatInput1.click();
      await page1.keyboard.type('Hi Emma! Doing great, thanks! Are you free this weekend for coffee to catch up? 🙌', { delay: 20 });
      await page1.keyboard.press('Enter');
      await sleep(1500);
    }
  } catch (e) {
    console.log('Chat reply error:', e.message);
  }

  // -------------------------------------------------------------
  // CAPTURING SCREENSHOTS
  // -------------------------------------------------------------
  console.log('Capturing screenshots...');

  // 1. Real-time chat screenshot (with active chat conversation dialogue)
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'realtime_chat.webp'), type: 'webp', quality: 92 });
  console.log('Captured realtime_chat.webp');

  // 2. News feed screenshot
  await page1.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2500);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'thumb.webp'), type: 'webp', quality: 92 });
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'news_feed.webp'), type: 'webp', quality: 92 });
  console.log('Captured news_feed.webp and thumb.webp');

  // 3. Post detail screenshot
  await page1.evaluate(() => {
    const posts = Array.from(document.querySelectorAll('article, div[class*="post" i], div[class*="card" i]'));
    const post = posts.find(p => p.innerText && p.innerText.includes('Golden hour'));
    if (post) post.click();
  });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'post_detail.webp'), type: 'webp', quality: 92 });
  console.log('Captured post_detail.webp');

  // 4. User Profile screenshot
  await page1.goto('https://mini-social-fe.vercel.app/profile', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(1500);
  // Click back to profile
  await page1.evaluate(() => {
    const backBtn = Array.from(document.querySelectorAll('*')).find(el => el.innerText && el.innerText.includes('Back to profile'));
    if (backBtn) backBtn.click();
  });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'user_profile.webp'), type: 'webp', quality: 92 });
  console.log('Captured user_profile.webp');

  // 5. Mobile responsive view
  console.log('Capturing Mobile View...');
  await page1.setViewport({ width: 390, height: 844, deviceScaleFactor: 2, isMobile: true });
  await page1.goto('https://mini-social-fe.vercel.app/home', { waitUntil: 'networkidle2', timeout: 35000 });
  await sleep(2000);
  await page1.screenshot({ path: path.join(OUTPUT_DIR, 'mobile_view.webp'), type: 'webp', quality: 92 });
  console.log('Captured mobile_view.webp');

  await browser.close();
  console.log('All MiniSocial operations and captures completed successfully!');
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
