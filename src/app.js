/*DESAFÍO N°3/ CONSIGNA:
Basado en el desafío N°2" Manejo de archivos".
Objetivo: Generar un servidor con express.
Con 2 Rutas:
/products →  lee ese archivo y devuelveun array de productos.Va a recibir un Query llamado limit. METODO FILTER.
/products/:id → recibir por parametro el id y devolver el producto solicitado. METODO FIND Y getProductById
TRABAJAMOS CON PROMESAS: ARCHIVOS ASINCRONICOS
EL DESAFIO ES SOLO PARA GETS ASI QUE SE DEBES TENER UN ARCHIVO CON PRODUCTOS.

EN CONSOLA: CORRER PUERTO: npm run nodemon o npm run devNode
*/


//importo modulo express para crear el servidor
import express from 'express'
// Importa la clase correcta (ProdutManager) desde el módulo correspondiente
import { ProductManager } from './config/ProductManager.js';




//hago referencia a lo q seria todo el codigo de express
const app = express()
//variable para cambios de puertos
const PORT = 8000
// Crea una instancia de ProdutManager
const productManager = new ProductManager('/products.json');




//en la ruta inicial ejecitame el siguiente comando
app.get('/', (req, res) => {

    res.send("Servidor creado recientemente en Express")

})


//FUNCION ASINCRONICA PARA OBTENER TODOS LOS PRODUCTOS.Uso: metodo getProducts

app.get('/products', async (req, res) => {
    // esta Ruta recibe 1 límite opcional de cant.de prods.
    // IF se proporciona → limita, ELSE → envía todos.
    //CONSULTAR EL ARRAY DE PRODS QUE TRAIGO DESDE FS:consulto mis querys, el elemento limit.
    const { limit } = req.query
    //{limit} xq pueden ir varios elementos a consultar
    //consulto mi productManager, me return prods
    const PRODS = await productManager.getProducts()

    const LIMITE = parseInt(limit)

    if (LIMITE) {

        if (LIMITE < 0) {
            res.send("ingrese un valor valido numeral para las queries")
        } else {
            //devuelve una copia del array sin modificar su valor
            //valor inicial→0, al fin→ limit
            const prodsLimit = PRODS.slice(0, limit)
              //lo devuelve
        res.send(prodsLimit)
        }
      
    } else {
        res.send("valor no aceptado en queries")
    }
})



//consulta en ruta productos. pid no es valor fijo.pid creado x crypto
app.get(`/products/:pid`, async (req, res) => {
    //consulto por parametro la solicitud
    const PRODUCTID = req.params.pid
    //consulto por id de producto
    /*todo dato q se consulta desde un parametro es un string. Si tenemos un id tipo numerico hay que parsearlo*/
    const PROD = await productManager.getProductById(PRODUCTID)
    //llamo a ProductManager para devolver prod c/id solicitado


        res.send(PROD);

})



//Defino mi servidor → app, app escucha PORT, f anonima → show message
app.listen(PORT, () => {

    console.log(`Server on port ${PORT}`)

})