import appHelper from '../helpers/app_helper.js'
import loginPage from '../pageobjects/login.page.js'

export class LoginAction {
    async login({ username, password }) {
        await appHelper.type(loginPage.usernameInput, username)
        await appHelper.type(loginPage.passwordInput, password)
        await appHelper.tap(loginPage.loginButton)
    }

    async isOnLoginPage() {
        return appHelper.isDisplayed(loginPage.loginButton)
    }

    async getErrorMessage() {
        return appHelper.getText(loginPage.errorMessage)
    }
}

export default new LoginAction()
