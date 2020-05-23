import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import api from '../../services/api'

import './styles.css'
import image from '../../assets/imgs/no-image.png'

export default function Products() {
    const [products, setProducts] = useState([])

    useEffect(() => {
        api.get('products')
            .then(response => {
                setProducts(response.data.products)
            })
    }, [])

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
        </>
    )
}