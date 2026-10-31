import appHelper from '../helpers/app_helper.js'
import productsPage from '../pageobjects/products.page.js'

export class ProductsAction {
    async isOnProductsPage() {
        return appHelper.isDisplayed(productsPage.title)
    }

    async sortBy(label) {
        await appHelper.tap(productsPage.sortButton)
        await appHelper.tap(productsPage.sortOption(label))
        await appHelper.waitForDisplayed(productsPage.title)
    }

    async getItemTitles() {
        return appHelper.getTexts(productsPage.itemTitles)
    }

    async getItemPrices() {
        const prices = await appHelper.getTexts(productsPage.itemPrices)
        return prices.map((price) => Number(price.replace('$', '')))
    }

    async logout() {
        await appHelper.tap(productsPage.menuButton)
        await appHelper.tap(productsPage.logoutButton)
    }
}

export default new ProductsAction()
