import { expect } from '@wdio/globals'
import loginAction from '../actions/login.action.js'
import productsAction from '../actions/products.action.js'
import { appHook } from '../hooks/app.hook.js'
import users from '../test_data/users.json' with { type: 'json' }

describe('Sorting products', () => {
    beforeEach(async () => {
        await appHook.launchApp()
        await loginAction.login(users.validUser)
        await productsAction.isOnProductsPage()
    })

    it('should sort products by name from A to Z', async () => {
        await productsAction.sortBy('Name (A to Z)')

        const titles = await productsAction.getItemTitles()
        await expect(titles[0]).toBe('Sauce Labs Backpack')
        await expect(titles).toEqual([...titles].sort((a, b) => a.localeCompare(b)))
    })

    it('should sort products by name from Z to A', async () => {
        await productsAction.sortBy('Name (Z to A)')

        const titles = await productsAction.getItemTitles()
        await expect(titles[0]).toBe('Test.allTheThings() T-Shirt (Red)')
        await expect(titles).toEqual([...titles].sort((a, b) => b.localeCompare(a)))
    })

    it('should sort products by price from low to high', async () => {
        await productsAction.sortBy('Price (low to high)')

        const prices = await productsAction.getItemPrices()
        await expect(prices[0]).toBe(7.99)
        await expect(prices).toEqual([...prices].sort((a, b) => a - b))
    })

    it('should sort products by price from high to low', async () => {
        await productsAction.sortBy('Price (high to low)')

        const prices = await productsAction.getItemPrices()
        await expect(prices[0]).toBe(49.99)
        await expect(prices).toEqual([...prices].sort((a, b) => b - a))
    })
})
