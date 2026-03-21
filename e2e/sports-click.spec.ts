import { test, expect } from "@playwright/test";

test("Sports dropdown opens on click (desktop)", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(1000);

  // Find and click the Sports button
  const btn = page.locator('header button', { hasText: "Sports" });
  await expect(btn).toBeVisible();
  await btn.click();
  await page.waitForTimeout(500);

  // Check dropdown appeared
  const dropdown = page.locator("#sports-mega-menu");
  const isVisible = await dropdown.isVisible();
  console.log("Dropdown visible after click:", isVisible);

  // Screenshot
  await page.screenshot({ path: "test-screenshots/sports-click.png", clip: { x: 0, y: 0, width: 1440, height: 700 } });

  // Check aria-expanded changed
  const expanded = await btn.getAttribute("aria-expanded");
  console.log("aria-expanded:", expanded);
});

test("Sports dropdown opens on click (mobile)", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(500);

  // Open mobile menu
  await page.locator('[aria-label="Open menu"]').click();
  await page.waitForTimeout(500);

  // Check sports are visible (they should be always visible in mobile menu, not in a sub-dropdown)
  const baseball = page.locator('text=Baseball').first();
  const isVisible = await baseball.isVisible();
  console.log("Baseball visible in mobile menu:", isVisible);

  await page.screenshot({ path: "test-screenshots/sports-mobile.png", fullPage: false });
});
