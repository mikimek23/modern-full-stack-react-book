import { test, expect } from './fixtures/index.js'

test('allows creating a new post', async ({ page, auth }) => {
  const testUser = await auth.signUpAndLogIn()
  const title = 'test post' + Date.now()
  await page.locator('a').filter({ hasText: 'Write' }).click()
  await page.getByRole('textbox', { name: 'Title' }).click()
  await page.getByRole('textbox', { name: 'Title' }).fill(title)
  await page.getByRole('textbox', { name: 'Content' }).click()
  await page
    .getByRole('textbox', { name: 'Content' })
    .fill('this is test post ')
  await page.getByRole('textbox', { name: 'Tags (comma separated)' }).click()
  await page
    .getByRole('textbox', { name: 'Tags (comma separated)' })
    .fill('test')
  await page.getByRole('button', { name: 'Create' }).click()
  //await page.waitForURL('**/')
  await expect(page.getByRole('link', { name: title })).toBeVisible()
  await page.getByRole('link', { name: title }).click()
  await expect(page.getByRole('link', { name: title })).toBeVisible()
})
