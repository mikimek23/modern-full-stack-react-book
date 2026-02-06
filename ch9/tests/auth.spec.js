import { test } from '@playwright/test'

test('allows sign up and log in', async ({ page }) => {
  const name = 'test' + Date.now()
  const email = name + '@test.com'
  await page.goto('/')
  await page.getByRole('link', { name: 'Log In' }).click()
  await page.getByRole('link', { name: 'Sign Up' }).click()
  await page.locator('#name').click()
  await page.locator('#name').fill(name)
  await page.locator('#email').click()
  await page.locator('#email').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('1234')
  await page.getByRole('button', { name: 'Sign Up' }).click()
  await page.waitForURL('**/login')
  await page.locator('#email').click()
  await page.locator('#email').fill(email)
  await page.locator('#password').click()
  await page.locator('#password').fill('1234')
  await page.getByRole('button', { name: 'Log In' }).click()
  await page.waitForURL('**/')
  //await expect(page.getByRole('link', { name: 'Log out' })).toBeVisible()
})
