const express = require('express')
const routes = express.Router()

const ProductController = require('./controllers/ProductController')
const OrderController = require('./controllers/OrderController')


routes.post('/products', ProductController.create)

routes.get('/products', ProductController.store)

routes.put('/products/:id', ProductController.update)

routes.delete('/products/:id', ProductController.delete)

routes.post('/orders', OrderController.create)

routes.post('/orders/add-product', OrderController.addProduct)

routes.get('/order/:id', OrderController.show)

routes.get('/orders', OrderController.index)



module.exports = routes;