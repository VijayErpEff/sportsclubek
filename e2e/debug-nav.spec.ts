import { test } from "@playwright/test";

test("screenshot working dropdown", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("http://localhost:3000", { waitUntil: "networkidle" });
  await page.waitForTimeout(2000);

  await page.locator('header button', { hasText: "Sports" }).click();
  await page.waitForTimeout(500);

  const menus = await page.locator('[role="menu"]').count();
  console.log("Menus visible:", menus);

  await page.screenshot({ path: "test-screenshots/dropdown-working.png", clip: { x: 0, y: 0, width: 1000, height: 600 } });
});
