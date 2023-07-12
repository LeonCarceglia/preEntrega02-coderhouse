import CartsManager from "../dao/manager/db/carts.js"
import {Router} from "express"

const router = Router()
const cartsManager = new CartsManager()

router.post("/", async (req,res) =>{
    const cart = req.body
    const createdCart = await cartsManager.createCart(cart)
    res.status(201).json({status: "ok", data: createdCart})
})

router.get("/", async (req, res) => {
    const carts = await cartsManager.getCarts()
    res.json({status: "ok", data: carts})
})

router.get("/:id", async (req,res) =>{
    const {id} = req.params
    const cart = await cartsManager.getCart(id)
    res.json({status: "ok", data: cart})
})

router.post("/:cId/product/:pId", async (req, res) =>{
    const ids = req.params
    const {quantity} = req.body
    const newCart = await cartsManager.addProductToCart(ids.cId, ids.pId, quantity)
    res.status(201).json({status: "ok", success: newCart})
})

router.delete("/:cid/products/:pid", async (req,res) => {
    const ids = req.params
    await cartsManager.deleteProduct(ids)
    res.sendStatus(204)
})

router.put("/:cid", async (req, res) => {
    const {cid} = req.params
    const products = req.body
    const cartUpdated = await cartsManager.updateCart(cid, products)
    res.json({status: "ok", data: cartUpdated})
})

router.put("/:cid/products/:pid", async (req, res) =>{
    const ids = req.params
    const {quantity} = req.body
    const cartUpdated = await cartsManager.updateProductQuantity(ids, quantity)
    res.json({status: "ok", data: cartUpdated})
})

router.delete("/:cid", async (req,res) =>{
    const {cid} = req.params
    await cartsManager.deleteProducts(cid)
    res.sendStatus(204)
})

export default router