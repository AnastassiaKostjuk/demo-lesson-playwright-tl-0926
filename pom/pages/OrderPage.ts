import { Page } from '@playwright/test'
import { Button } from '../atoms/Button'
import { Input } from '../atoms/Input'

export class OrderPage {
  readonly page: Page
  readonly statusButton: Button
  readonly usernameField: Input
  readonly phoneField: Input
  readonly commentField: Input

  constructor(page: Page) {
    this.page = page
    this.statusButton = new Button(page, 'openStatusPopup-button')//page.getByTestId('openStatusPopup-button')
    this.usernameField = new Input(page, 'username-input')
    this.phoneField = new Input(page, 'phone-input')
    this.commentField = new Input(page, 'comment-input')
  }
}
