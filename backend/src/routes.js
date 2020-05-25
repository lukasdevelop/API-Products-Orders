const express = require('express')
const routes = express.Router()

const ProductController = require('./controllers/ProductController')
const OrderController = require('./controllers/OrderController')
const ItensController = require('./controllers/ItensController')


routes.post('/products', ProductController.create)

routes.get('/products', ProductController.store)

routes.get('/products/:id', ProductController.show)

routes.put('/products/:id', ProductController.update)

routes.delete('/products/:id', ProductController.delete)

routes.post('/orders', OrderController.create)

routes.get('/order', OrderController.showByClient)

routes.get('/orders', OrderController.index)

routes.post('/itens', ItensController.create)

routes.delete('/itens/:id', OrderController.delete)



module.exports = routes;