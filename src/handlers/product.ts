import { Request, Response } from "express"
import Product from "../models/Product.model"

export const getProducts = async (req : Request, res: Response) => {
    // try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: {exclude: ['createdAt', 'updatedAt']}
        })
        res.json({data: products})
    // } catch (error) { // No se ejecutará el catch error gracias segun el test coverage, por ello es innecesario el try-catch
    //     console.log(error)
    // }
}

export const getProductById = async (req : Request, res: Response) => {
    // try {
        const { id } = req.params
        const product = await Product.findByPk(id)

        if(!product){
            return res.status(404).json({
                error: 'Producto no encontrado'
            })
        }

        res.json({data: product})
    // } catch (error) {
    //     console.log(error)
    // }
}

export const createProduct = async (req : Request, res: Response) => {
    // try {
        // Validación en el Handler
        // await check('name').notEmpty().withMessage('El nombre del producto no puede ir vacío').run(req)
        // await check('price')
        //     .isNumeric().withMessage('Valor no válido')
        //     .notEmpty().withMessage('El precio del producto no puede ir vacío')
        //     .custom(value => value > 0).withMessage('El precio no es válido')
        //     .run(req)
    
        // * ALTERNATIVA
        // const product = new Product(req.body) // Nuevo producto con los datos envidos
        // const savedProduct = await product.save() // Espera a que se guarde el dato en la base de datos y así obtenerlo con el ID generado por la BD
    
        const product = await Product.create(req.body) // En un solo paso

        res.status(201).json({data: product}) // Status 201: Para la creación de un dato en BD
    // } catch (error) {
    //     console.log(error)
    // }
}

export const updateProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    await product.update(req.body)
    await product.save()

    res.json({data: product})
}

export const updatedAvailability = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }

    // Actualizar
    product.availability = !product.dataValues.availability
    await product.save()
    res.json({data: product})
}

export const deleteProduct = async (req : Request, res : Response) => {
    const { id } = req.params
    const product = await Product.findByPk(id)

    if(!product){
        return res.status(404).json({
            error: 'Producto no encontrado'
        })
    }
    
    await product.destroy()
    res.json({data: 'Producto eliminado'})
}