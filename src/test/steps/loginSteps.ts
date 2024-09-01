import { Given, When, Then } from "@cucumber/cucumber";

import { chromium, Page, Browser, expect } from "@playwright/test";

let browser: Browser;
let page: Page;


Given('User navigates to the application', async function () {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  await page.goto("https://studiffy.com/");
})


Given('User enter the email as {string}', async function (email) {
  await page.locator("#sign-in-email-input").fill(email);
});

Given('User enter the password as {string}', async function (password) {
  await page.locator("#sign-in-password-input").fill(password);
})

When('User click on the login button', async function () {
  await page.locator("#sign-in-button").click();
});


Then('Login should be success', async function () {
  // Define the expected URL
  const expectedUrl = 'https://studiffy.com/dashboards/default';

  // Wait for the URL to match the expected URL with a timeout
  try {
      await page.waitForURL(expectedUrl, { timeout: 10000 }); // 10 seconds timeout
      console.log('Login was successful');
  } catch (error) {
      // If the URL did not match within the timeout, log the current URL and fail the test
      const currentUrl = page.url();
      console.error(`Login failed. Expected URL: ${expectedUrl}, but found: ${currentUrl}`);
      throw new Error(`Login failed. Expected URL: ${expectedUrl}, but found: ${currentUrl}`);
  } finally {
      // Close the browser
      await browser.close();
  }
});


When('Login should fail', async function () {
  const failureMesssage = page.locator("#error-alert");
  await expect(failureMesssage).toBeVisible();
  await browser.close();
});
