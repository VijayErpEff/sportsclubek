import { test } from "@playwright/test";

const pages = [
  { name: "homepage", path: "/" },
  { name: "about", path: "/about" },
  { name: "facilities", path: "/facilities" },
  { name: "memberships", path: "/memberships" },
  { name: "schedule", path: "/schedule" },
  { name: "baseball", path: "/baseball" },
  { name: "cricket", path: "/cricket" },
  { name: "badminton", path: "/badminton" },
  { name: "pickleball", path: "/pickleball" },
  { name: "baseball-academy", path: "/baseball-academy" },
  { name: "contact", path: "/contact" },
  { name: "offers", path: "/offers" },
  { name: "careers", path: "/careers" },
  { name: "open-house", path: "/open-house" },
  { name: "kids-agility", path: "/kids-agility" },
];

for (const page of pages) {
  test(`screenshot ${page.name}`, async ({ page: p }) => {
    await p.goto(`http://localhost:3000${page.path}`, { waitUntil: "networkidle" });
    await p.waitForTimeout(1000);
    await p.screenshot({
      path: `test-screenshots/${page.name}.png`,
      fullPage: true,
    });
  });
}
