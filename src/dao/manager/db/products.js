import productModel from "../../models/product.js"

export default class ProductsManager{

    getProducts =  (reqs) =>{
        const { limit = 10 } = reqs
        const { page = 1 } = reqs
        const { sort = "desc" } = reqs // Ver si puedo hacer que no se ordenen
        const { query = null} = reqs
        let condition = {}
        if (query == "avaiable"){
            condition = { stock: { $gt: 0 } }
        }
        else if(query != undefined){
            condition = { category: query }
        }
        const options = {
            limit,
            page,
            lean: true,
            sort: { price: sort }
        }
       return productModel.paginate(condition, options)
    }

    getProduct = (id) =>{
        return productModel.findById(id)
    }

    createProduct = (product) =>{
        return productModel.create(product)
    }

    updateProduct = (id, product) =>{
        return productModel.findByIdAndUpdate(id, product)
    }

    deleteProduct = (id) =>{
        return productModel.findByIdAndDelete(id)
    }

}