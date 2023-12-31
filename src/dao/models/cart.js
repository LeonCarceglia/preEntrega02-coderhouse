import mongoose from "mongoose"

const cartCollection = "carts"
const cartSchema = new mongoose.Schema({
        type: [
            {
                product:{
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ]
})

const cartModel = mongoose.model(cartCollection, cartSchema)
export default cartModel