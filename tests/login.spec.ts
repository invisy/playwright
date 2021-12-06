import { test, expect } from '@playwright/test';

test('Testing login', async ({ page }) => {
	await page.goto("/");

	await test.step('Test user can open login menu', async () => {
		await page.click('nav >> text=Log in');
		await expect(page.locator('#logInModal')).toBeVisible();
	});

	await test.step('Test user can close login menu', async () => {
		await page.click('#logInModal button:has-text("×")');
		await expect(page.locator('#logInModal')).toBeHidden();
	});

	await test.step('Test user can open login menu after hiding', async () => {
		await page.click('nav >> text=Log in');
		await expect(page.locator('#logInModal')).toBeVisible();
	});

	await test.step('Test login with clear login and password textboxes', async () => {
		page.once('dialog', async dialog => await dialog.accept());
		const [dialog] = await Promise.all([
			page.waitForEvent('dialog'),
			page.click('#logInModal button:has-text("Log in")')
		]);
		expect(dialog.message()).toContain('Please fill out Username and Password');
	});

	await test.step('Test login with wrong credentials', async () => {
		await page.fill('#logInModal input[type=text]', 'vlad-vlasiuk');
		await page.fill('#logInModal input[type=password]', 'bbbbb');
		page.once('dialog', async dialog => await dialog.accept());
		const [dialog] = await Promise.all([
			page.waitForEvent('dialog'),
			page.click('#logInModal button:has-text("Log in")')
		]);
		expect(dialog.message()).toContain('Wrong password.');
	});

	await test.step('Test login with valid credentials', async () => {
		await page.fill('#logInModal input[type=text]', 'vlad-vlasiuk');
		await page.fill('#logInModal input[type=password]', 'aaaaa');
		await Promise.all([
			page.waitForNavigation(),
			page.click('#logInModal button:has-text("Log in")')
		]);

		await expect(page.locator('html')).toContainText('Welcome vlad-vlasiuk');
	});
});