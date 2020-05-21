const express = require('express')
const routes = express.Router()

const ProductController = require('./controllers/ProductController')

routes.post('/products', ProductController.create)

routes.get('/products', ProductController.store)

routes.put('/products/:id', ProductController.update)

routes.delete('/products/:id', ProductController.delete)

module.exports = routes;