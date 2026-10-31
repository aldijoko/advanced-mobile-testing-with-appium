export class ProductsPage {
    get title() {
        return 'android=new UiSelector().text("PRODUCTS")'
    }

    get sortButton() {
        return '~test-Modal Selector Button'
    }

    get itemTitles() {
        return '~test-Item title'
    }

    get itemPrices() {
        return '~test-Price'
    }

    get menuButton() {
        return '~test-Menu'
    }

    get logoutButton() {
        return '~test-LOGOUT'
    }

    sortOption(label) {
        return `android=new UiSelector().text("${label}")`
    }
}

export default new ProductsPage()
