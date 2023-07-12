// import Carts from "../dao/manager/filesystem/Carts.js"
import CartsManager from "../dao/manager/db/carts.js"
import {Router} from "express"

const router = Router()
/* 
const cart = new Carts()

router.post("/", (req, res) => { // Agrega un carro vacio
    cart.addCart()
    return res.status(201).json({ success: "Cart created" })
})

router.get ("/:cId", (req, res) => { // Devuelve los productos del carro con el ID especificado
    const { cId } = req.params
    const products = cart.getProductsCart(cId)
    return res.status(200).json(products)
})
router.post("/:cId/product/:pId", (req, res) =>{ // Agrega un producto al carrito con el Id asignado
    const ids = req.params
    const { quantity } = req.body
    cart.addProductCart(ids.cId, ids.pId, quantity)
    return res.status(201).json({ success: "Product added" })
}) */

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

router.put("/:cId/product/:pId", async (req, res) =>{
    const ids = req.params
    const {quantity} = req.body
    await cartsManager.addProductToCart(ids.cId, ids.pId, quantity)
    res.status(201).json({status: "ok", success: "Product added"})
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params
    await cartsManager.deleteCart(id)
    res.sendStatus(204)
})

export default router