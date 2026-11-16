import { Page, Locator } from '@playwright/test'
import { BaseAtom } from './BaseAtom'

export class Input extends BaseAtom {
  constructor(container: Page | Locator, dataTestId: string) {
    super(container, dataTestId)
  }

  async fill(text: string): Promise<void> {
    await this.atomLoc.fill(text)
  }

  async clear(): Promise<void> {
    await this.atomLoc.clear()
  }

  async clearAndFill(text: string): Promise<void> {
    await this.clear()
    await this.fill(text)
  }

  async click(): Promise<void> {
    await this.atomLoc.click()
  }
}