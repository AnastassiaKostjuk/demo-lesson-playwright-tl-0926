import { test } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'

test('TL-17-1 signIn button disabled when incorrect data inserted', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.open()
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkVisible()
  await loginPage.signInButton.checkEnabled(false)
})

test('TL-17-2 login with correct credentials and verify order creation page', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const orderCreationPage = new OrderPage(page)

  await loginPage.open()
  await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.usernameField.checkVisible()
  await orderCreationPage.phoneField.checkVisible()
  await orderCreationPage.commentField.checkVisible()
})
