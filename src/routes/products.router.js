import ProductsManager from "../dao/manager/db/products.js"
import {Router} from "express"

const router = Router()
const productsManager = new ProductsManager()

router.get("/:limit?/:page?/:query?/:sort?", async (req, res) => {
    const currentUrl = req.protocol + "://" + req.get("host") + req.originalUrl
    const products = await productsManager.getProducts(req.query, currentUrl)
    res.json({status: "success", data: products})
})

router.get("/:id", async (req,res) =>{
    const {id} = req.params
    const product = await productsManager.getProduct(id)
    res.json({status: "ok", data: product})
})

router.put("/:id", async (req,res) =>{
    const {title, description, code, price, stock, category, thumbnails} = req.body
    if(!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({status: "error", message: "No data sent!"})
    }
    const {id} = req.params
    const newProduct = req.body
    const updatedProduct = await productsManager.updateProduct(id, newProduct)
    res.json({status: "ok", data: updatedProduct})
})

router.post("/", async (req,res) =>{
    const product = req.body
    const createdProduct = await productsManager.createProduct(product)
    res.status(201).json({status: "ok", data: createdProduct})
})

router.delete("/:id", async (req,res) => {
    const {id} = req.params
    await productsManager.deleteProduct(id)
    res.sendStatus(204)
})

export default router