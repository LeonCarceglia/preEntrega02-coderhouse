import fs from "node:fs"

export default class Carts {

    //Atributos
    
    #carts
    #path

    //Constructor de la clase

    constructor(){
        this.#carts = []
        this.#path = "Carts.json"
        this.#loadCarts()
    }

    // Metodos internos

    #existsId(idExists){ // Busca un id, si existe devuelve el carrito 
        return this.#carts.find(cart => cart.id == idExists)
    }

    #loadCarts(){ // Lee el archivo de carritos y los carga en el arreglo interno, si no existe el archivo lo crea
        if(fs.existsSync(this.#path)){
            const carts = fs.readFileSync(this.#path, "utf-8")
            this.#carts = JSON.parse(carts)
        }else{
            fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        }
    }

    addCart(){ // Añade un carrito VACIO al arreglo si este no existe previamente
        const cart = {
            id: this.#carts.length + 1,
            products: []
        }
        this.#carts.push(cart)
        fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        return "Cart created"
    }

    getCartByld(idFind){ // Devuelve el carrito que se busca por id solo si existe, sino devuelve un mensaje de error
        return this.#existsId(idFind) || "Not found"
    }

    getProductsCart(idCart){ // Devuelve los productos del carrito con el id que envian
        const cart = this.getCartByld(idCart)
        return cart.products
    }

    addProductCart(idCart, idProduct, quantity){ // Añande un producto al carrito con el id especificado si el producto no esta agregado, ese caso aumenta la canitdad del mismo
        let index = this.#carts.findIndex(c => c.id == idCart)
        if(index == -1){
            this.addCart()
            index = this.#carts.length-1
        }
        const idExist = this.#carts[index].products.find(p => p.product == idProduct)
        if (!idExist){
            const product = {
                product: idProduct,
                quantity: parseInt(quantity)
            }
            this.#carts[index].products.push(product)
        }
        else{
            const indexProduct = this.#carts[index].products.findIndex(p => p.product == idProduct)
            this.#carts[index].products[indexProduct].quantity += parseInt(quantity)
        }
        fs.writeFileSync(this.#path, JSON.stringify(this.#carts))
        return "Product added/updated"
    }
}