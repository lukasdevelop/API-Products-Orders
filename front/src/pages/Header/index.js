import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import Itens from '../Itens'

import './styles.css'

export default function Header() {
    return (
        <Navbar fixed="top" className="header" expand="lg">
            <Container>
                <Navbar href="#">BIPP + Ezoom</Navbar>
                <a href="/">
                    <Button variant="light">Produtos</Button>
                </a>
                <a href="/orders">
                    <Button variant="light">Pedidos</Button>
                </a>                
                <Itens />
            </Container>
        </Navbar>
    )
}