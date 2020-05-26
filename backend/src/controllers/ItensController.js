const connection = require('../database/connection')

module.exports = {

    async create(req, res) {
        const { products_id, amount, } = req.body
        const id = req.headers.authorization

        let orders_id = null

        try {
            orders_id = await connection('orders')
                .select('*')
                .where('client_id', '=', id)
                .andWhere('status', '=', 0)

            if (orders_id.length <=0) {
                
                const orders_id = await connection('orders')
                    .insert({
                        client_id: id
                    })

                    console.log('s', orders_id)

                    await connection('itens_order').insert({
                        products_id,
                        orders_id,
                        amount  
                    })
            }else{

                await connection('itens_order').insert({
                    products_id,
                    orders_id: orders_id[0].id,
                    amount  
                })

            }

            return res.status(200).send({ success: 'Produto adicionado com sucesso.' })


        } catch (error) {

            console.log(error)

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