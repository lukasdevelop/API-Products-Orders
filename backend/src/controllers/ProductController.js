const connection = require('../database/connection')

module.exports = {

    async create(req, res) {
        const {name, price} = req.body

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
    },

    async store(req, res) {

        const { page = 1 } = req.query; 

        try {

            const products = await connection('products')
                .limit(5)
                .offset((page - 1) * 5)
                .select('*');

            return res.json({ products })

        } catch (error) {
            return res.status(400).send({ error: "Falha na requisição, tente novamente." });
        }
    },

    async update(req, res) {

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

    },

    async delete(req, res) {

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

    }
}