import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './styles.css'
import image from '../../assets/imgs/no-image.png'

export default function Products() {
    return (
        <>
            <Container className="products-container">
            <h1>Produtos</h1> 
                <Row>
                    <Col>
                        <ul>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                            <li>
                                <img src={image} alt="imagem" />
                                <p>Celular</p>
                                <p>R$ 100.00</p>
                            </li>
                        </ul>
                    </Col>
                    
                </Row>
            </Container>
        </>
    )
}