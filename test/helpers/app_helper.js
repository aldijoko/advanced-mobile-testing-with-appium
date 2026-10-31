import { $, $$, driver } from '@wdio/globals'

const APP_PACKAGE = 'com.swaglabsmobileapp'

class AppHelper {
    async launchCleanApp() {
        await driver.terminateApp(APP_PACKAGE)
        await driver.execute('mobile: clearApp', { appId: APP_PACKAGE })
        await driver.activateApp(APP_PACKAGE)
    }

    async waitForDisplayed(selector) {
        const element = await $(selector)
        await element.waitForDisplayed()
        return element
    }

    async tap(selector) {
        const element = await this.waitForDisplayed(selector)
        await element.click()
    }

    async type(selector, value) {
        const element = await this.waitForDisplayed(selector)
        await element.setValue(value)
    }

    async getText(selector) {
        const element = await this.waitForDisplayed(selector)
        return element.getText()
    }

    async isDisplayed(selector) {
        const element = await this.waitForDisplayed(selector)
        return element.isDisplayed()
    }

    async getTexts(selector) {
        const elements = await $$(selector)
        const texts = []
        for (const element of elements) {
            texts.push(await element.getText())
        }
        return texts
    }
}

export default new AppHelper()
