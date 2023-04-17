const products = []
const socketProduct = (io) => {
    io.on('connection', socket => {
        console.log('Cliente conectado')
        socket.emit('Productos', products)
    })
}
module.exports = {
    socketProduct
}