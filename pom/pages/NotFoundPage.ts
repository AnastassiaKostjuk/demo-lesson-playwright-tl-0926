import { expect, Locator, Page } from '@playwright/test'
import { BasePage } from './BasePage'

export class NotFoundPage extends BasePage {
  readonly notFoundTitle: Locator

  constructor(page: Page) {
    super(page)
    this.notFoundTitle = page.getByTestId('orderNotFound-title')
  }

  async checkNotFoundPageVisible(visible = true): Promise<void> {
    if (visible) {
      await expect(this.notFoundTitle).toBeVisible()
    } else {
      await expect(this.notFoundTitle).toBeHidden()
    }
  }
}