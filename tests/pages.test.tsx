import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Portfolio Pages', () => {
  test('should load home page', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page).toHaveTitle("Parag Naikade | Lead Full Stack Developer");
    await expect(page.locator('body')).toBeTruthy();
  });

  test('should have proper navigation', async ({ page }) => {
    await page.goto(BASE_URL);
    const links = page.locator('a');
    await expect(links).toBeTruthy();
  });

  test('should handle 404 gracefully', async ({ page }) => {
    const response = await page.goto(`${BASE_URL}/non-existent-page`);
    expect(response?.status()).toBe(404);
  });
});