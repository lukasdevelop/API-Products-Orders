const connection = require('../database/connection')

module.exports = {
   
    async create(req, res) {
        const { client_id } = req.body

        const orderOpen = await connection('orders')
            .select('*')
            .where('client_id', '=', client_id)
            .andWhere('status', '=', 0)

        if (orderOpen.length <= 0) {

            try {
                const order = await connection('orders')
                    .insert({
                        client_id                    
                    })

                return res.status(200).send({ order });

            } catch (error) {

                return res.status(500).send({ error: 'Erro. Tente novamente.' })

            }
        } else {
            return res.status(400).send({ error: 'Já existe um pedido aberto para esse cliente.' })
        }
    },

    async show(req, res) {

        const { id } = req.params

        try {
            const order = await connection('orders')
                .select('*')
                .where('id', '=', id)

            return res.status(200).json(order)

        } catch (error) {
            return res.status(500).send({ error: 'Erro. Tente novamente.' })
        }
    },

    async index(req, res) {

        const client_id = req.headers.authorization

        try {
            const orders = await connection('orders')
                .join('itens_order', 'orders.id', '=', 'itens_order.orders_id')
                .join('products', 'products.id', '=', 'itens_order.products_id')
                .select('*')
                .where('client_id', '=', client_id)

            if(orders.length <= 0){
                return res.status(400).send({error: "Nenhum produto adicionado."})
            }

            return res.status(200).json(orders)

        } catch (error) {
            return res.status(500).send({ error: 'Erro. Tente novamente.' })
        }
    }
}