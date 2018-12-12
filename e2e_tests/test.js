const puppeteer = require('puppeteer');

let browser;
let page;

before('initialize puppeteer', async function() {
  this.timeout(0);

  browser = await puppeteer.launch({ ignoreHTTPSErrors: true });
  page = await browser.newPage();
});

after('close browser', async function() {
  this.timeout(0);

  await browser.close();
});

describe('login', function() {
  this.timeout(0);

  it('should log in', async function() {
    await page.goto(process.env.MDC_URL);
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type=submit]')
    ]);
    await page.type('#inputUsername', 'developer');
    await page.type('#inputPassword', 'developer');
    await Promise.all([
      page.waitForNavigation(),
      page.click('button[type=submit]')
    ]);
  });
});
