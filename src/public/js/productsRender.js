import CartsManager from "../../dao/manager/db/carts.js"


const cartManager = new CartsManager()

document.addEventListener("DOMContentLoaded", () => {
  const addToCartButtons = document.querySelectorAll(".addToCartButton")

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", async () => {
      const cartId = button.dataset.cartId
      const productId = button.dataset.productId
      const quantity = button.dataset.quantity
    })
  })
})

async function addToCart(cartId, productId, quantity) {
    return await cartManager.addProductToCart(cartId, productId, quantity)
}