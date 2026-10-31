import { driver } from '@wdio/globals'
import appHelper from '../helpers/app_helper.js'

export const appHook = {

    async launchApp() {
        await appHelper.launchCleanApp()
    },

    async afterTest(test, context, { passed }) {
        if (!passed) {
            await driver.takeScreenshot()
        }
    }
}
