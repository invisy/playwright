import { test, expect } from '@playwright/test';

test.use({ storageState: 'storageState.json' });

test('Testing the buying process', async ({ page }) => {
	await page.goto("/");

	await test.step('User can go to Samsung galaxy s6 page', async () => {
		await Promise.all([
			page.waitForNavigation({ url: '**/prod.html?idp_=1' }),
			page.click('#contcont >> text=Samsung galaxy s6')
		]);
	});

	await test.step('User can add Samsung galaxy s6 to cart', async () => {
		page.once('dialog', async dialog => await dialog.accept());
		const [dialog] = await Promise.all([
			page.waitForEvent('dialog'),
			page.click('text=Add to cart')
		]);
		expect(dialog.message()).toContain('Product added');
	});

	await test.step('User can open cart', async () => {
		await Promise.all([
			page.waitForNavigation({ url : '**/cart.html' }),
			page.click('text=Cart')
		]);
	});

	await test.step('Cart contains 1 item', async () => {
		await expect(page.locator('#tbodyid tr')).toHaveCount(1);
	});

	await test.step('User can open "Place Order" menu', async () => {
		await page.click('#page-wrapper >> text=Place Order')
		await expect(page.locator('#orderModal')).toBeVisible();
	});

	await test.step('User can place order', async () => {
		await page.fill('#name', 'Vlad');
		await page.fill('#country', 'Ukraine');
		await page.fill('#city', 'Kyiv');
		await page.fill('#card', '4149393693188396'); //card number was randomly generated
		await page.fill('#month', '12');
		await page.fill('#year', '2023');
		
		await page.click('#orderModal button >> text=Purchase')
		await expect(page.locator('html')).toContainText('Thank you for your purchase!');
		await page.waitForTimeout(1000);	// fix late onlick event assigning by "SweetAlert"
		await Promise.all([
			page.waitForNavigation({ url : '**/index.html' }),
			page.click('button >> text=OK')
		]);
	});

});
