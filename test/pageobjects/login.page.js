export class LoginPage {
    get usernameInput() {
        return '~test-Username'
    }

    get passwordInput() {
        return '~test-Password'
    }

    get loginButton() {
        return '~test-LOGIN'
    }

    get errorMessage() {
        return '//android.view.ViewGroup[@content-desc="test-Error message"]/android.widget.TextView'
    }
}

export default new LoginPage()
