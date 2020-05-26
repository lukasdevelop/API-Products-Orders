const connection = require('../database/connection')
const _ = require('lodash')

module.exports = {

    async showByClient(req, res) {

        const id = req.headers.authorization

        try {
            const order = await connection('orders')
                .select('*')

                .where('client_id', '=', id)
                .andWhere('status', '=', 0)

            return res.status(200).json(order)

        } catch (error) {
            return res.status(500).send({ error})
        }
    },

    async index(req, res) {

        const client_id = req.headers.authorization

        try {
            const orders = await connection('orders')
                .join('itens_order', 'orders.id', '=', 'itens_order.orders_id')
                .join('products', 'products.id', '=', 'itens_order.products_id')
                .select('itens_order.id', 'itens_order.amount', 'orders.status', 'orders.client_id', 'orders.id as orders_id', 'products.name', 'products.price', 'products.id as products_id')
                .where('client_id', '=', client_id)
                .andWhere('orders.status', '=', 0)


            if (orders.length <= 0) {
                return res.status(400).send({ error: "Nenhuma ordem em aberto" })
            }

            return res.status(200).json(orders)

        } catch (error) {
            return res.status(500).send({ error})
        }
    },

    async ordersComplete(req, res) {

        const client_id = req.headers.authorization

        try {
            const orders = await connection('orders')
                .join('itens_order', 'orders.id', '=', 'itens_order.orders_id')
                .join('products', 'products.id', '=', 'itens_order.products_id')
                .select('itens_order.id', 'itens_order.amount', 'orders.status', 'orders.client_id', 'orders.id as orders_id', 'products.name', 'products.price', 'products.id as products_id')
                .where('client_id', '=', client_id)
                .andWhere('orders.status', '=', 1)

            if (orders.length <= 0) {
                return res.status(400).send({ error: "Nenhum produto adicionado." })
            }

            let ods = []
            const ordersArray = _.groupBy(orders, "orders_id")

            _.forEach(ordersArray, (oa) => {

                let total = 0
                _.forEach(oa, (i) => {
                    total += i.price * i.amount
                })

                ods.push({
                    id: oa[0].orders_id,
                    items: oa,
                    status: oa[0].status,
                    total,
                })

            })

            return res.status(200).json(ods)

        } catch (error) {
            return res.status(500).send({ error})
        }
    },

    async updateStatusOrder(req, res) {

        const { id } = req.params
        const client_id = req.headers.authorization

        try {
            await connection('orders')
                .select('*')
                .where('client_id', '=', client_id)
                .andWhere('id', '=', id)
                .update({
                    status: 1
                })

            return res.status(200).send({ success: 'Pedido finalizado com sucessso.' })

        } catch (error) {
            return res.status(500).send({ error })
        }
    },

    async delete(req, res) {

        const { id } = req.params;

        const order = await connection('itens_order')
            .select('*')
            .where('id', '=', id)

        if (order.length <= 0) {
            return res.status(400).send({ error: 'Item não encontrado no pedido.' })

        }

        try {

            await connection('itens_order')
                .where('id', '=', id)
                .del()

            return res.status(200).send({ success: 'Item deletado com sucesso.' })

        } catch (error) {

            return res.status(500).send({ error})
        }

    },
}