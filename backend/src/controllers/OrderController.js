const connection = require('../database/connection')

module.exports = {
    async addProduct(req, res) {
        const { products_id, orders_id, amount, } = req.body

        const idOrder = await connection('orders')
            .select('*')
            .where('id', '=', orders_id)

        if (idOrder.length <= 0) {

            return res.status(404).send({ error: 'O pedido não existe.' })
        }

        try {

            await connection('itens_order').insert({
                products_id,
                orders_id,
                amount
            })

            return res.status(200).send({ success: 'Produto adicionado com sucesso.' })

        } catch (error) {
            return res.status(400).send({ error: 'Erro. Tente novamente.' })

        }
    },

    async create(req, res) {
        //deixar estatus no banco como default 0
        const { client_id, status } = req.body

        try {
            const order = await connection('orders')
                .insert({
                    client_id,
                    status
                })

            return res.status(200).send({ order });

        } catch (error) {

            return res.status(400).send({ error: 'Erro. Tente novamente.' })

        }

    },

    async show(req, res) {

        const { id } = req.params

        try {
            const order = await connection('orders')
                .select('*')
                .where('id', '=', id)

            return res.status(400).json(order)

        } catch (error) {
            return res.status(400).send({ error: 'Erro. Tente novamente.' })
        }
    },

    async index(req, res) {

        try {
            const orders = await connection('orders')
                .select('*')

            return res.status(200).json(orders)
        } catch (error) {
            return res.status(400).send({ error: 'Erro. Tente novamente.' })
        }
    }
}