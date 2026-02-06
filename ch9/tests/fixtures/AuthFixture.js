export class AuthFixture {
  constructor(page) {
    this.page = page
  }
  async signUpAndLogIn() {
    const name = 'test' + Date.now()
    const email = name + '@test.com'
    await this.page.goto('/')
    await this.page.getByRole('link', { name: 'Log In' }).click()
    await this.page.getByRole('link', { name: 'Sign Up' }).click()
    await this.page.locator('#name').click()
    await this.page.locator('#name').fill(name)
    await this.page.locator('#email').click()
    await this.page.locator('#email').fill(email)
    await this.page.locator('#password').click()
    await this.page.locator('#password').fill('1234')
    await this.page.getByRole('button', { name: 'Sign Up' }).click()
    await this.page.waitForURL('**/login')
    await this.page.locator('#email').click()
    await this.page.locator('#email').fill(email)
    await this.page.locator('#password').click()
    await this.page.locator('#password').fill('1234')
    await this.page.getByRole('button', { name: 'Log In' }).click()
    await this.page.waitForURL('**/')
    return name
  }
}
