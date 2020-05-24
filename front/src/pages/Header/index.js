import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Dropdown from 'react-bootstrap/Dropdown'
import Itens from '../Itens'
import { Link } from 'react-router-dom'

import './styles.css'

export default function Header() {
    return (
        <Navbar fixed="top" className="header" expand="lg">
            <Container>
                <Navbar href="#">BIPP + Ezoom</Navbar>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Produtos
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <Link to="/">Listar</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <Link to="/products/register">Cadastrar</Link>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                        Pedidos
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                        <Dropdown.Item href="#/action-1">Listar</Dropdown.Item>
                        <Dropdown.Item href="#/action-2">Cadastrar</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Itens />
            </Container>
        </Navbar>
    )
}