const express = require('express')
const connection = require('./database/connection')
const routes = express.Router()

routes.post('/products', async (req, res) => {
    const {name, price} = req.body;

    try {
        await connection('products')
        .insert({
            name,
            price
        })

    return res.status(200).send({success: "Produto inserido com sucesso."});
        
    } catch (error) {
        return res.status(400).send({error: "Falha ao cadastrar, tente novamente."});  
    }
})

routes.get('/products', async (req, res) => {
    
    try {
        const products = await connection('products')
            .select('*');
        
            return res.json({products})
            
    } catch (error) {
        return res.status(400).send({error: "Falha na requisição, tente novamente."});  
    }
})

module.exports = routes;