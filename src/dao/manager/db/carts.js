import cartModel from "../../models/cart.js"

export default class CartsManager{

    getCarts = () =>{
        return cartModel.find().lean()
    }

    getCart = (id) =>{
        return cartModel.findById(id)
        .populate("type.product", "_id title description price")
        .lean()
    }

    createCart = (products = []) =>{
        return cartModel.create({ type: products })
    }

    updateCart = (id, cart) =>{
        return cartModel.findByIdAndUpdate(id, {type: cart})
    }

    deleteCart = (id) =>{
        return cartModel.findByIdAndDelete(id)
    }

    addProductToCart = (idCart, idProduct, quantity) =>{
        cartModel.findById(idCart)
        .then(cart => {
            cart.type.push({product: idProduct, quantity})
            return cart.save()
        })
    }

    deleteProduct = (ids) =>{
        cartModel.findById(ids.cid)
        .then(cart => {
            const productIndex = cart.type.findIndex(product => product === ids.pid)
            cart.type.splice(productIndex, 1)
            return cart.save()
        })
    }

    updateProductQuantity = (ids, quantity) =>{
        return cartModel.findOneAndUpdate(
            { _id: ids.cid, "type.product": ids.pid },
            { $set: { "type.$.quantity": quantity } },
            { new: true }
    )}

    deleteProducts = (id) =>{
        return cartModel.findByIdAndUpdate(id, { type: [] })
    }

}