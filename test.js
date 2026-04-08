const { chromium } = require('/paperclip/.npm/_npx/e41f203b7505f1fb/node_modules/playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  console.log('Testing homepage...');
  await page.goto('http://localhost:3003');
  const title = await page.title();
  console.log('Title:', title);
  
  console.log('Testing /contact...');
  await page.goto('http://localhost:3003/contact');
  const h2 = await page.textContent('h2');
  console.log('H2:', h2);
  
  const content = await page.content();
  if (content.includes('Contact Us')) {
    console.log('✅ Contact works!');
  }
  
  await browser.close();
  console.log('Done');
})();