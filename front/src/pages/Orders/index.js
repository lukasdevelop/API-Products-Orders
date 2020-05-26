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


    async function loadOrders(number = 1) {
        const response = await api.get(`orders/completed?page=${number}`,{
            headers: {
                authorization: 1
            }
        })

        setPage(number)

        setOrders(response.data)

        console.log('jajaj', response.headers)
        
        setTotal(response.headers['x-total-count'])

    }

    useEffect(() => {
        loadOrders()
    }, [total])

    let active = page;
    let items = [];
    for (let number = 1; number <= Math.ceil(total / 4); number++) {
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
                                    <div class="orders-header-item">
                                    <p>Pedido Nº {item.id}</p>
                                        <p><Button variant="danger">
                                            <FiTrash2 size={20}></FiTrash2>
                                        </Button>
                                        </p>    
                                    </div>
                                        {item.items.map((i) => (
                                        <p class="orders-itens">
                                            <strong>{i.amount}x {i.name}</strong>
                                           
                                            {i.price}
                                        </p>
                                        
                                    ))}
                                    
                                    <div class="orders-itens">
                                        <p class="total">Total</p> 
                                        <p>{item.total}</p>
                                    </div>
                                    <p class="status">{(item.status == 0) ? 'Aberto' : 'Finalizado'}</p>
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