import { test, expect } from '@playwright/test';

test('Testing categories', async ({ page }) => {
	await page.goto("/");

	await test.step('Default category is "Phones"', async () => {
		await expect(page.locator('#tbodyid:first-child')).toContainText('Samsung galaxy s6');
	});

	await test.step('User can open monitors category', async () => {
		await page.click('a >> text=Monitors');
		await expect(page.locator('#tbodyid:first-child')).toContainText('Apple monitor 24');
	});

	await test.step('User can open laptops category', async () => {
		await page.click('a >> text=Laptops');
		await expect(page.locator('#tbodyid:first-child')).toContainText('Sony vaio i5');
	});

	await test.step('User can open phones category', async () => {
		await page.click('a >> text=Phones');
		await expect(page.locator('#tbodyid:first-child')).toContainText('Samsung galaxy s6');
	});
});