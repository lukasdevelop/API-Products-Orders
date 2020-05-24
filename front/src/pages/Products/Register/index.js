import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import {useHistory} from 'react-router-dom'


import './styles.css'
import api from '../../../services/api'

export default function Register() {

    const [name, setName] = useState('');
    const [price, setPrice] = useState('');

    const history = useHistory()

    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            price
        }

        try {
            await api.post('products', data);
            alert('Cadastrado com sucesso.')

            history.push('/') 

        } catch (error) {
            alert(error)
        }
    }

    return (
        <>
            <Container className="products-container">
                <h1>Cadastrar Produtos</h1>
                <Row>
                    <Col>
                        <div className="content">
                            <form onSubmit={handleRegister}>
                                <Form.Group>
                                    <Form.Control size="lg" type="text" placeholder="Nome do Produto"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                    <br />
                                    <Form.Control size="lg" type="text" placeholder="Preço do Produto"
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Cadastrar 
                                </Button>
                            </form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </>
    )
}