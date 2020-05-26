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

routes.get('/order', OrderController.showByClient)

routes.get('/orders', OrderController.index)

routes.get('/orders/completed', OrderController.ordersComplete)

routes.put('/order/complete/:id', OrderController.updateStatusOrder)

routes.delete('/order/:id', OrderController.delete)

routes.post('/itens', ItensController.create)

routes.delete('/itens/:id', ItensController.delete)



module.exports = routes;