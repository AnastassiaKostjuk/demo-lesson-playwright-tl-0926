import { test, expect } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { faker } from '@faker-js/faker/locale/en'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'

let loginPage: LoginPage

test.beforeEach(async ({ page }) => {
  loginPage = new LoginPage(page)
  await loginPage.open()
})

test('signIn button disabled when incorrect data inserted', async ({}) => {
  await loginPage.usernameField.fill(faker.lorem.word(2))
  await loginPage.passwordField.fill(faker.lorem.word(7))
  await loginPage.signInButton.checkEnabled(false)
})

test('error message displayed when incorrect credentials used', async ({}) => {
  await loginPage.signInWrongCredentials(faker.lorem.word(5), faker.lorem.word(10))
})

test('login with correct credentials and verify order creation page', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  // verify at least few elements on the order creation page
  await orderCreationPage.usernameField.checkVisible()
  await orderCreationPage.phoneField.checkVisible()
  await orderCreationPage.commentField.checkVisible()
  await orderCreationPage.orderButton.checkVisible()
  await orderCreationPage.languageENButton.checkVisible()
  await orderCreationPage.languageRUButton.checkVisible()
})

test('login and create order', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  // verify at least few elements on the order creation page
  await orderCreationPage.usernameField.fill(faker.person.fullName())
  await orderCreationPage.phoneField.fill(faker.phone.number())
  await orderCreationPage.commentField.fill(faker.lorem.sentence())
  await orderCreationPage.order()
})

test('login and create order with phone field not filled', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.usernameField.fill(faker.person.fullName())
  await orderCreationPage.commentField.fill(faker.lorem.sentence())
  await orderCreationPage.phoneField.fill(faker.lorem.words(1))
  await orderCreationPage.phoneField.clear()
  await expect(orderCreationPage.phoneInputErrorPopup).toBeVisible()
  await orderCreationPage.orderButton.checkEnabled(false)
})

test('login and create order with phone field filled with 1 number', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.usernameField.fill(faker.person.fullName())
  await orderCreationPage.commentField.fill(faker.lorem.sentence())
  await orderCreationPage.phoneField.fill('1')
  await expect(orderCreationPage.phoneInputErrorPopup).toBeVisible()
  await orderCreationPage.orderButton.checkEnabled(false)
})

test('login and create order with name field not filled', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.phoneField.fill(faker.phone.number())
  await orderCreationPage.commentField.fill(faker.lorem.sentence())
  await orderCreationPage.usernameField.fill(faker.lorem.word('jj'))
  await orderCreationPage.usernameField.clear()
  await expect(orderCreationPage.nameInputErrorPopup).toBeVisible()
  await orderCreationPage.orderButton.checkEnabled(false)
})

test('login and create order with name field filled with 1 symbol', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.phoneField.fill(faker.phone.number())
  await orderCreationPage.commentField.fill(faker.lorem.sentence())
  await orderCreationPage.usernameField.fill('j')
  await expect(orderCreationPage.nameInputErrorPopup).toBeVisible()
  await orderCreationPage.orderButton.checkEnabled(false)
})

test('login and sign out', async ({}) => {
  const orderCreationPage = await loginPage.signIn(USERNAME, PASSWORD)
  await orderCreationPage.statusButton.checkVisible()
  await orderCreationPage.logOutButton.checkVisible()
  await orderCreationPage.logOutButton.click()
  await loginPage.signInButton.checkVisible()
})
