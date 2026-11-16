import { test } from '@playwright/test'
import { LoginPage } from '../../pom/pages/LoginPage'
import { PASSWORD, USERNAME } from '../../config/env-data'
import { OrderPage } from '../../pom/pages/OrderPage'
import { NotFoundPage } from '../../pom/pages/NotFoundPage'
import { FoundPage } from '../../pom/pages/FoundPage'

const TEST_DATA = {
  existingOrderId: 21025,
}

test.describe('Homework-18 e2e', () => {
  let loginPage: LoginPage
  let orderPage: OrderPage
  let notFoundPage: NotFoundPage
  let foundPage: FoundPage
  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    orderPage = new OrderPage(page)
    notFoundPage = new NotFoundPage(page)
    foundPage = new FoundPage(page)
    await loginPage.open()
  })

  test('should display a message when order is not found', async () => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.orderIdInput.fill('0')
    await orderPage.findOrderButton.click()
    await notFoundPage.checkNotFoundPageVisible()
  })

  test('should display order details when order is found', async () => {
    await loginPage.signIn(USERNAME, PASSWORD)
    await orderPage.statusButton.checkVisible()
    await orderPage.statusButton.click()
    await orderPage.orderIdInput.fill(String(TEST_DATA.existingOrderId))
    await orderPage.findOrderButton.click()
    await foundPage.checkFoundPageVisible()
  })
})
