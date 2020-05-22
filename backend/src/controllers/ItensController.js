const connection = require('../database/connection')

module.exports = {

    async create(req, res) {
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
}