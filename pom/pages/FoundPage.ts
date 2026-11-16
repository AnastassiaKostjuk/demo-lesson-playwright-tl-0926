import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class FoundPage extends BasePage {
  readonly orderDetailsBlock: Locator

  constructor(page: Page) {
    super(page)
    this.orderDetailsBlock = page.locator('.order-details')
  }

  async checkFoundPageVisible(visible = true): Promise<void> {
    if (visible) {
      await expect(this.orderDetailsBlock).toBeVisible()
    } else {
      await expect(this.orderDetailsBlock).toBeHidden()
    }
  }
}