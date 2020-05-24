import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import api from '../../services/api'

import './styles.css'
import image from '../../assets/imgs/no-image.png'

export default function Products() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1);

    async function loadProducts(number = 1){
        const response = await api.get(`products?page=${number}`)

        setPage(number)

        setProducts(response.data.products)
        setTotal(response.headers['x-total-count'])
            
    }

    useEffect(() => {
       loadProducts()
    }, [total])

    let active = page;
    let items = [];
    for (let number = 1; number <= Math.ceil(total/4); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => loadProducts(number)}>
                {number}
            </Pagination.Item>
        );
    }

    const paginationBasic = (
        <div>
            <Pagination>{items}</Pagination>
            <br />
        </div>
    );

    return (
        <>
            <Container className="products-container">
                <h1>Produtos</h1>
                <Row>
                    <Col>
                        <ul>
                            {products.map(product => (
                                <li key={product.id}>
                                    <img src={image} alt="imagem" />
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>

            <Container>
                {paginationBasic}
            </Container>
            
        </>
    )
}