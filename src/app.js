import express from "express"
import handlebars from "express-handlebars"
import mongoose from "mongoose"

import viewsRouter from "./routes/views.router.js"
import productsRouter from "./routes/products.router.js"
import cartsRouter from "./routes/carts.router.js"

import __dirname from "./utils.js"


const app = express()
const connection = await mongoose.connect("mongodb+srv://leoncarceglia:coder@cluster0.ipkw6cl.mongodb.net/")


app.engine("handlebars", handlebars.engine())
app.set("views", __dirname + "/views")
app.set("view engine", "handlebars")

app.use(express.json())
app.use(express.static(__dirname + "/public"))

app.use("/", viewsRouter)
app.use("/api/products", productsRouter)
app.use("/api/carts", cartsRouter)

const httpServer = app.listen(3000, () => {
    console.log("Server is listening on port 3000")
})