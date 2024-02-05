//npm run nodemon


//importo modulo http para crear el servidor
import http from 'http'
import nodemon from 'nodemon'

//SINTAXIS: Creo un servidor que me va a devolver una respuesta simple con createServer y les paso los parametros req (donde consulto) y res (donde respondo), funcion flecha
//req = request = una peticion
//res = response = una respuesta
const app = http.createServer((req,res)=>{

res.end("hola este es mi primer servidor con express")

})
//metodo para finalizar una peticion, es decir enviar una info, en lo que seria un res

/*todos los servidores debe estar alojado en algun lugar. Voy a tener q tener un puerto de lo que seria mi computadora activo para poder enviar peticiones a estos elementos
*/

//Defino mi servidor app, y va a escuchar el puerto de mi aplicacion que voy a habilitar para que se pueda comunicar con el mundo externo en este caso lo que seria mi propia computadora
//defino el puerto 8000, funcion anonimay le digo que cuando me pueda conectar a este puerto, me devuelva un mensaje

app.listen(8000,()=>{

    console.log("Server on port 8000")

})