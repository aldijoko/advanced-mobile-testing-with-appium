import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action.js'
import productsAction from '../actions/products.action.js'
import { appHook } from '../hooks/app.hook.js'
import users from '../test_data/users.json' with { type: 'json' }

describe('Logout', () => {
    beforeEach(async () => {
        await appHook.launchApp()
        await loginAction.login(users.validUser)
        await productsAction.isOnProductsPage()
    })

    it('should logout and return to the login page', async () => {
        await productsAction.logout()

        await expect(await loginAction.isOnLoginPage()).toBe(true)
    })
})
