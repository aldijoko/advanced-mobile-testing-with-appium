import { appHook } from './test/hooks/app.hook.js'

export const config = {
    runner: 'local',
    port: 4723,
    specs: ['./test/specs/**/*.js'],
    maxInstances: 1,
    capabilities: [{
        platformName: 'Android',
        'appium:deviceName': 'emulator-5554',
        'appium:platformVersion': '12',
        'appium:automationName': 'UiAutomator2',
        'appium:app': './app/sauce-demo.apk',
        'appium:appPackage': 'com.swaglabsmobileapp',
        'appium:appActivity': 'com.swaglabsmobileapp.MainActivity',
        'appium:appWaitActivity': '*',
        'appium:autoGrantPermissions': true,
        'appium:noReset': false,
        'appium:fullReset': true,
        'appium:newCommandTimeout': 300
    }],
    logLevel: 'error',
    bail: 0,
    waitforTimeout: 15000,
    connectionRetryTimeout: 120000,
    connectionRetryCount: 3,
    services: ['appium'],
    framework: 'mocha',
    reporters: [
        'spec',
        ['allure', {
            outputDir: 'allure-results',
            disableWebdriverStepsReporting: true,
            disableWebdriverScreenshotsReporting: false
        }]
    ],
    mochaOpts: {
        ui: 'bdd',
        timeout: 120000
    },
    afterTest: appHook.afterTest
}
