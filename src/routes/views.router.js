import express from "express"
import productModel from "../dao/models/product.js"
import cartModel from "../dao/models/cart.js"

const router = express.Router()

router.get("/products", async (req, res)=> {
  const { page = 1 } = req.query
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productModel.paginate({}, { page, lean: true })
  const products = docs
  const cart = await cartModel.create({ type: [] })
  const cartId = cart._id.toString() 
  function addToCart(product, quantity) {
    console.log(product)
    cartModel.findById(cartId)
    .then(cart => {
        cart.type.push({product: product, quantity})
        return cart.save()
    })
  }
  res.render("products", {
    products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,  
    prevPage,
    nextPage,
    cart
  })
})

router.get("/carts/:cid", async (req, res) => {
  const {cid} = req.params
  const cart = await cartModel.findById(cid).populate("type.product", "_id title descritpon price")
  res.render("carts", { cart })
})


export default router