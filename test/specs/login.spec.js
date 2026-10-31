import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action.js'
import productsAction from '../actions/products.action.js'
import { appHook } from '../hooks/app.hook.js'
import users from '../test_data/users.json' with { type: 'json' }

describe('Login', () => {
    beforeEach(appHook.launchApp)

    it('should login successfully with a valid user', async () => {
        await loginAction.login(users.validUser)

        await expect(await productsAction.isOnProductsPage()).toBe(true)
    })

    it('should fail to login with an invalid user', async () => {
        await loginAction.login(users.invalidUser)

        await expect(await loginAction.getErrorMessage())
            .toBe('Username and password do not match any user in this service.')
        await expect(await loginAction.isOnLoginPage()).toBe(true)
    })

    it('should fail to login with a locked out user', async () => {
        await loginAction.login(users.lockedUser)

        await expect(await loginAction.getErrorMessage())
            .toBe('Sorry, this user has been locked out.')
    })
})
