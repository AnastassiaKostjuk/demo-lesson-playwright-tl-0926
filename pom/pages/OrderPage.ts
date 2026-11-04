import { Locator, Page, expect } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Button
  readonly usernameField: Input
  readonly phoneField: Input
  readonly commentField: Input
  readonly orderButton: Button
  readonly orderSuccessPopup: Locator
  readonly languageENButton : Button
  readonly languageRUButton: Button
  readonly phoneInputErrorPopup: Locator
  readonly nameInputErrorPopup: Locator
  readonly logOutButton: Button

  constructor(page: Page) {
    this.page = page
    this.statusButton = new Button(page, 'openStatusPopup-button')//page.getByTestId('openStatusPopup-button')
    this.usernameField = new Input(page, 'username-input')
    this.phoneField = new Input(page, 'phone-input')
    this.commentField = new Input(page, 'comment-input')
    this.orderButton = new Button(page, 'createOrder-button')
    this.orderSuccessPopup = page.locator('[data-name="orderSuccessfullyCreated-popup"]')
    this.languageENButton = new Button(page, 'language-en')
    this.languageRUButton = new Button(page, 'language-ru')
    this.phoneInputErrorPopup = page.locator('[data-name="phone-input-error"]')
    this.nameInputErrorPopup = page.locator('[data-name="username-input-error"]')
    this.logOutButton = new Button(page, 'logout-button')
  }

  async order(): Promise<void> {
    await this.orderButton.click()
    await expect(this.orderSuccessPopup).toBeVisible()
  }
}
