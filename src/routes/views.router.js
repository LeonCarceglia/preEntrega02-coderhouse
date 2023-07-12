import express from "express"
import productModel from "../dao/models/product.js"

const router = express.Router()

router.get("/products", async (req, res)=> {
  const { page = 1 } = req.query
  const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, ...rest } =
    await productModel.paginate({}, { page, lean: true })
  const products = docs
  res.render("products", {
    products,
    page: rest.page,
    hasPrevPage,
    hasNextPage,
    prevPage,
    nextPage,
  })
})

router.get("/carts/:cid"), async (req, res) => {
  res.render("carts")
}

export default router
