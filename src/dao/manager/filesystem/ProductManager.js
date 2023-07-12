import fs from "node:fs"

export default class ProductManager {

    //Atributos
    
    #products
    #path

    //Constructor de la clase

    constructor(){
        this.#products = []
        this.#path = "Products.json"
        this.#loadProducts()
    }

    //Metodos internos

    #existsId(idExists){ // Busca un id, si existe devuelve el producto 
        return this.#products.find(product => product.id == idExists)
    }

    #loadProducts(){ // Lee el archivo de productos y los carga en el arreglo interno, si no existe el archivo lo crea
        if(fs.existsSync(this.#path)){
            const products = fs.readFileSync(this.#path, "utf-8")
            this.#products = JSON.parse(products)
        }else{
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
        }
    }

    addProduct(product){ // Añade un producto al arreglo si este no existe previamente
        if (!this.#products.find((element) => {return element.code == product.code})){
            let productNew = {
                title: product.title,
                description: product.description,
                code: product.code,
                price: product.price,
                status: product.status || "true",
                stock: product.stock,
                category: product.category,
                thumbnails: product.thumbnails || [],
                id: 0
            }
            if(this.#products.length > 0){
                productNew.id = this.#products[this.#products.length -1].id+1
            }
            else {
                productNew.id = 1
            }
            this.#products.push(productNew)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return true
        }
        else{
            return false
        }
    }
    
    getProducts(){ // Devuelve todos los productos del arreglo
        return this.#products
    }
    
    getProductByld(idFind){ // Devuelve el producto que se busca por id solo si existe, sino devuelve un mensaje de error
        return this.#existsId(idFind) || "Not found"
    }

    updateProduct(idUpdate, updatedProduct){ // Actualiza el producto con el id que le pasan
        const index = this.#products.findIndex(p => p.id == idUpdate)
        if(index != -1){
            const { id, ...rest } = updatedProduct 
            this.#products[index] = { ...this.#products[index], ...rest }
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return "Product updated"
        } else {
            return "Not found"
        }
    }

    deleteProduct(idDelete){ // Busca una id y borra ese producto si existe
        if (this.#existsId(idDelete) != undefined){
            this.#products.splice(idDelete-1,1)
            fs.writeFileSync(this.#path, JSON.stringify(this.#products))
            return "Product deleted"
        }
        else {
            return "Not found"
        }
    }
}