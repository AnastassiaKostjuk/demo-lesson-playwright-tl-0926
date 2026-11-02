import { expect, Locator, Page } from '@playwright/test'

export class Button {
  page: Page
  buttonLoc: Locator

  constructor(page: Page, dataTestId: string /* "test-123" */) {
    this.page = page
    this.buttonLoc = page.getByTestId(dataTestId)
  }

  async click(): Promise<void> {
    await this.buttonLoc.click();
  }

  async checkEnabled(enabled = true): Promise<void> {
    await expect(this.buttonLoc).toBeEnabled({ enabled: enabled });
  }

  async checkVisible(visible = true): Promise<void> {
    await expect(this.buttonLoc).toBeVisible({ visible: visible });
  }
}