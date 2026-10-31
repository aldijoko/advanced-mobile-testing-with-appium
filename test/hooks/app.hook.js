import { driver } from '@wdio/globals'
import appHelper from '../helpers/app_helper.js'

export const appHook = {
    // Registered with Mocha's beforeEach in the specs, because WDIO's beforeTest
    // runs after Mocha's beforeEach and would reset the app right after login.
    async launchApp() {
        await appHelper.launchCleanApp()
    },

    // The Allure reporter attaches this screenshot to the failed test.
    async afterTest(test, context, { passed }) {
        if (!passed) {
            await driver.takeScreenshot()
        }
    }
}
