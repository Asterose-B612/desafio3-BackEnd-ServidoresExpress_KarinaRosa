//creo una clase de productos
//El thumbnail normalmente arranca vacío, directamente digo entonces this.thumbnail = []
//improtyo el id y lo creo automaticamente con cryto
import crypto from 'crypto'

export class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = []
        this.code = code
        this.stock = stock
        this.id = crypto.randomBytes(10).toString('hex')
    }
}


