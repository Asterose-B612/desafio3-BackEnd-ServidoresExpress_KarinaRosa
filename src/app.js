//EN CONSOLA: CORRER PUERTO: npm run nodemon o npm devNode

//importo modulo express para crear el servidor
import express from 'express'


//hago referencia a lo q seria todo el codigo de express
const APP = express()
//variable para cambios de puertos
const PORT = 8000

//en la ruta inicial ejecitame el siguiente comando
APP.get('/', (req, res) => {

    res.send("Servidor creado recientemente en Express")

})


// Ruta productos recibe 1 límite opcional de cantidad.
// IF proporciona → limita cantidad productos, ELSE se envían todos.
APP.get(`/products`, (req, res) => {
    
    //CONSULTAR EL ARRAY DE PRODS QUE TRAIGO DESDE FILE SYSTEM:consulto mis querys, el elemento limit.
    const { limit } = req.params.query

})



//consulta en ruta productos. pid no es valor fijo.
APP.get(`/products/:pid`, (req, res) => {
    //consulto por parametro la solicitud
    const PRODUCTID = req.params.pid
    //recibo el id y lo muestro en consola 
    console.log(PRODUCTID)
    //llamo a ProductManager para devolver prod c/id solicitado
    res.send(`Id: ${PRODUCTID}`)

})


//Defino mi servidor → APP, APP escucha PORT, f anonima → show message
APP.listen(PORT, () => {

    console.log(`Server on port ${PORT}`)

})