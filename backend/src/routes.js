const express = require('express')
const connection = require('./database/connection')
const routes = express.Router()

routes.post('/products', async (req, res) => {
    const { name, price } = req.body;

    try {
        await connection('products')
            .insert({
                name,
                price
            })

        return res.status(200).send({ success: "Produto inserido com sucesso." });

    } catch (error) {
        return res.status(400).send({ error: "Falha ao cadastrar, tente novamente." });
    }
})

routes.get('/products', async (req, res) => {

    try {
        const products = await connection('products')
            .select('*');

        return res.json({ products })

    } catch (error) {
        return res.status(400).send({ error: "Falha na requisição, tente novamente." });
    }
})

routes.put('/products/:id', async (req, res) => {
    const { id } = req.params
    const { name, price } = req.body

    try {

        const product = await connection('products')
            .select('*')
            .where('id', '=', id)

        if (product.length <= 0) {

            return res.status(404).send({ error: "Produto não existente." });

        } else {
            await connection('products')
                .where('id', '=', id)
                .update({
                    name,
                    price
                })

            return res.status(200).send({ success: "Produto editado com sucesso." });
        }
    } catch (error) {

        return res.status(400).send({ error: "Falha na requisição, tente novamente." });
    }
})

routes.delete('/products/:id', async (req, res) => {
    const { id } = req.params;

    const product = await connection('products')
        .select('*')
        .where('id', '=', id)

    try {

        if (product.length <= 0) {
            return res.status(404).send({ error: "Produto não existente." });
        } else {
            await connection('products')
                .where('id', '=', id)
                .del();
            
            return res.status(200).send({ success: "Produto deletado com sucesso." });

        }

    } catch (error) {
        return res.status(400).send({ error: "Falha na requisição, tente novamente." });

    }


})

module.exports = routes;