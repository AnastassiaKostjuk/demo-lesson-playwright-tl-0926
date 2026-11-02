import { expect, Locator, Page } from '@playwright/test'

export class Input {
  page: Page
  inputLoc: Locator

  constructor(page: Page, dataTestId: string /* "test-123" */) {
    this.page = page
    this.inputLoc = page.getByTestId(dataTestId)
  }

  async checkVisible(visible = true): Promise<void> {
    await expect(this.inputLoc).toBeVisible({ visible: visible })
  }

  async fill(text: string): Promise<void> {
    await this.inputLoc.fill(text)
  }

  async clear(): Promise<void> {
    await this.inputLoc.clear()
  }

  async clearAndFill(text: string): Promise<void> {
    await this.clear();
    await this.fill(text);
  }

  async checkAttached(attached = true): Promise<void> {
    await expect(this.inputLoc).toBeAttached({ attached })
  }
}
