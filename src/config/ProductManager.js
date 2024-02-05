/*DESAFÍO N°3/ CONSIGNA:
Basado en el desafío N°2" Manejo de archivos".
Objetivo: Generar un servidor con express.
Con 2 Rutas:
/products →  lee ese archivo y devuelveun array de productos.Va a recibir un Query llamado limit. METODO FILTER.
/products/:id → recibir por parametro el id y devolver el producto solicitado. METODO FIND Y getProductById
TRABAJAMOS CON PROMESAS: ARCHIVOS ASINCRONICOS
EL DESAFIO ES SOLO PARA GETS ASI QUE SE DEBES TENER UN ARCHIVO CON PRODUCTOS.
*/



//VOY A USAR PROMESAS DE FS


//genero 1 clase con 1 constructor que me pide path como paramentro para poderlo almacenar

import { promises as fs } from 'fs'

export class ProductManager {
    constructor(path) {
        this.path = path
    }//path:seria la ruta donde van a estar alojados nuestros elementos. YA NO VA EL ARRAY VACIO



    //MÉTODOS:
    //f asincrona xq uso promesas fs., q me pide como parametro 1 nuevo producto
    async addProduct(newProduct) {
        //voy a consultar mis elementos, donde esta alojado mi array de productos en la ruta que me de this.path, lo voy a tomar como utf-8
        const PRODS = JSON.parse(await fs.readFile(this.path, 'utf-8'))

        // Verificar campos obligatorios
        const REQUIREDFIELDS = ['title', 'description', 'price', 'thumbnail', 'code', 'stock'];
        const HASERROR = await (async () => {
            for (const field of REQUIREDFIELDS) {
                if (!(field in newProduct) || newProduct[field] === undefined || newProduct[field] === '') {
                    console.log("Error: El campo '" + field + "' es obligatorio.");
                    return true;
                }
            }
            return false;
        })();

        if (HASERROR) {
            return // Salir de la función si hay un error
        }
        //1 vez q tengo el producto corroboro si existe VOY A VALIDAR
        //buscame 1 prod cuyo code sea igual al code del nuevo producto
        const INDICE = PRODS.findIndex(prod => prod.code === newProduct.code)
        //si el indice es distinto de -1(-1 significa que el elemento no existe)OJO CON PONER  !=-1
        console.log(INDICE)
        if (INDICE === -1) {
            //si no existe lo agrego al array
            PRODS.push(newProduct)
            //vuelvo a escribir este archivo.De lo que seria este nuevo array con este nuevo producto (DE ESTA LOCACION, ENVIAME ESTE ARRAY)
            await fs.writeFile(this.path, JSON.stringify(PRODS))
            //Y RETORNAME LO QUE SERIA EL MENSAJE
            console.log("Creado con éxito")
        } else {
            console.log("Producto existente")
        }
    }



    async getProducts() {
        const PRODS = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        //misma linea de codigo q al inicio
        console.log(PRODS)
    }



    //misma logica de la funcion anterior, le pido un id por parametro
    async getProductById(id) {
        const PRODS = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        //pregunto x el array de productos.Buscame el elemento cuyo id sea el id ingresado
        const PROD = PRODS.find(e => e.id === id)

        if (PROD) {
            console.log(PROD)
        } else {
            console.log("El producto no existe")
        }
    }



    // Función para actualizar un producto por su ID
    async updateProduct(id, nuevoProducto) {
        try {
            // Leer los productos actuales desde el archivo
            const PRODS = JSON.parse(await fs.readFile(this.path, 'utf-8'));

            // Crear un nuevo array con los productos actualizados
            const productosActualizados = PRODS.map(producto => {
                if (producto.id === id) {
                    // Si el ID coincide, actualizar el producto
                    return { ...producto, ...nuevoProducto };
                }
                return producto; // Mantener el producto sin cambios
            });

            // Verificar si al menos un producto fue actualizado
            const actualizacionExitosa = productosActualizados.some((p, index) => !Object.is(p, PRODS[index]));

            if (actualizacionExitosa) {
                // Guardar el array actualizado en el archivo
                await fs.writeFile(this.path, JSON.stringify(productosActualizados, null, 2));
                console.log('Actualización satisfactoria');
            } else {
                console.log('Producto inexistente o no hubo cambios');
            }
        } catch (error) {
            console.error('Error al actualizar el producto:', error);
        }
    }





    async deleteProduct(id) {
        const PRODS = JSON.parse(await fs.readFile(this.path, 'utf-8'))
        //CONSULTO POR INDICE
        const INDICE = PRODS.findIndex(e => e.id === id)
        //si el producto existe
        if (INDICE != -1) {
            //para editar un delete utilizo un filter: (filtrame todos los productos => cuyo id !=sea distinto al id ingresado)
            const PRODSFILTRADOS = PRODS.filter(e => e.id != id)
            //una vez que tengo este array editado, lo voy a pisar con el writeFile
            await fs.writeFile(this.path, JSON.stringify(PRODSFILTRADOS))
            console.log('Producto Eliminado')
        } else {
            console.log('Producto no encontrado')
        }
    }
}