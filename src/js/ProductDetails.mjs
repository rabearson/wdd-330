import { getLocalStorage, setLocalStorage } from "./utils.mjs";

export class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    addProductToCart() {
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails();
        document.getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}
function productDetailsTemplate(product) {
    document.querySelector("h2").textContent = product.Brand.name;
    document.querySelector("h3").textContent = product.NameWithoutBrand;
    document.querySelector(".product-card__price").textContent = product.FinalPrice;
    document.querySelector(".product__color").textContent = product.Colors[0].ColorName;
    document.querySelector(".product__description").textContent = product.DescriptionHtmlSimple;
    document.getElementById("addToCart").dataset.id = product.Id;
}