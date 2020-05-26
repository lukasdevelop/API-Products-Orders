import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Form from 'react-bootstrap/Form'

import _ from 'lodash'
import api from '../../services/api'
import { FiEdit, FiTrash2, FiPlusSquare } from 'react-icons/fi'


import './styles.css'
import Button from 'react-bootstrap/Button'

export default function Orders() {

    const [orders, setOrders] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)


    const loadOrders = async (number = 1) => {
        const response = await api.get(`orders/completed?page=${number}`, {
            headers: {
                authorization: 1
            }
        })

        setPage(number)

        setOrders(response.data)

        setTotal(response.headers['x-total-count'])

    }

    const handleDelete = async (e, id) => {
        e.preventDefault()

        try {
            await api.delete(`order/${id}`)

            loadOrders()

        } catch (error) {
            alert(error)
        }
    }

    useEffect(() => {
        loadOrders()
    }, [total])

    let active = page;
    let items = [];
    for (let number = 1; number <= Math.ceil(total / 8); number++) {
        items.push(
            <Pagination.Item key={number} active={number === active} onClick={() => loadOrders(number)}>
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
            <Container className="orders-container">
                <h1>Pedidos</h1>
                <Row>
                    <Col>
                        <ul >
                            {orders.map((item, index) => (
                                <li key={index} >
                                    <div className="orders-header-item">
                                        <p>Pedido Nº {item.id}</p>
                                        <p><Button onClick={(e) => handleDelete(e, item.id)} variant="danger">
                                            <FiTrash2 size={20}></FiTrash2>
                                        </Button>
                                        </p>
                                    </div>
                                    {item.items.map((i) => (
                                        <p className="orders-itens">
                                            <strong>{i.amount}x {i.name}</strong>

                                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(i.price)}</p>
                                        </p>

                                    ))}

                                    <div className="orders-itens">
                                        <p className="total">Total</p>
                                        <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.total)}</p>

                                    </div>
                                    <p className="status">{(item.status == 0) ? 'Aberto' : 'Finalizado'}</p>
                                </li>
                            ))}
                        </ul>
                    </Col>
                </Row>
            </Container>
            <Container>
                {/*paginationBasic*/}
            </Container>

        </>
    )
}