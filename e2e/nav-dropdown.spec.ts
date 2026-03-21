import { test } from "@playwright/test";

test("screenshot nav dropdown open", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Hover over the Sports button to open dropdown
  const sportsBtn = page.locator('header button:has-text("Sports")');
  await sportsBtn.click();
  await page.waitForTimeout(800);

  await page.screenshot({
    path: "test-screenshots/nav-dropdown.png",
    clip: { x: 0, y: 0, width: 1280, height: 600 },
  });
});

test("screenshot mobile nav open", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Open mobile menu
  const menuBtn = page.locator('[aria-label="Open menu"]');
  await menuBtn.click();
  await page.waitForTimeout(500);

  await page.screenshot({
    path: "test-screenshots/mobile-nav.png",
    fullPage: true,
  });
});
