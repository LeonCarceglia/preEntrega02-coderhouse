import cartModel from "../../models/cart.js"

export default class CartsManager{

    getCarts = () =>{
        return cartModel.find().lean()
    }

    getCart = (id) =>{
        return cartModel.findById(id)
    }

    createCart = (Cart) =>{
        return cartModel.create(Cart)
    }

    updateCart = (id, Cart) =>{
        return cartModel.findByIdAndUpdate(id, Cart)
    }

    deleteCart = (id) =>{
        return cartModel.findByIdAndDelete(id)
    }

    addProductToCart = (idCart, idProduct, quantity) =>{
        cartModel.findById(idCart)
        .then(cart => {
            cart.products.push({product: idProduct, quantity})
            return cart.save()
        })
    }
}