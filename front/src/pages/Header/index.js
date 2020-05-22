import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

import './styles.css'

export default function Header() {
    return (
        <Navbar fixed="top" className="header" expand="lg">
            <Container>
                <Navbar href="#">BIPP + Ezoom</Navbar>
            </Container>
        </Navbar>
    )
}