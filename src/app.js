import express, { urlencoded } from 'express'
import routerProducts from './routes/products.router.js'
import routerCarts from './routes/carts.router.js'
import { socketProduct } from './utils/socketProduct.js'
const { Server } = require('socket.io')
const app = express()

const PORT = 8080
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use('/api/products', routerProducts)
app.use('/api/carts', routerCarts)

socketProduct(io)

const httpServer  = app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en el servidor ${error}`))

const io = new Server(httpServer)