import React, { useState, useEffect } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Pagination from 'react-bootstrap/Pagination'
import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'

import api from '../../services/api'
import { FiEdit, FiTrash2, FiPlusSquare } from 'react-icons/fi'


import './styles.css'
import image from '../../assets/imgs/no-image.png'
import Button from 'react-bootstrap/Button'

export default function Products() {
    const [products, setProducts] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)

    const  handleEdit = async e => {
        e.preventDefault();

        const data = {
            name: e.target.ProductName.value,
            price: e.target.ProductPrice.value,
        }
        try {
            const response = await api.put(`products/${e.target.ProductID.value}`, data)

            alert(response)

        } catch (error) {
            alert(error)
        }

    }



    function ProductModal(props) {
        const [show, setShow] = useState(false);

        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);

        return (
            <>

                <Button>
                    <FiEdit size={20} onClick={handleShow} ></FiEdit>
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Produto {props.name} </Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => handleEdit(e)}>

                        <Modal.Body>
                        <Form.Group controlId="ProductID">
                                <Form.Control  type="hidden"
                                    defaultValue={props.id}
                                    name="ProductID"
                                />
                                <br />
                            </Form.Group>
                            <Form.Group controlId="ProductName">
                                <Form.Control size="lg" type="text" placeholder="Nome do Produto"
                                    defaultValue={props.name}
                                    name="ProductName"
                                />
                                <br />
                            </Form.Group>
                            <Form.Group controlId="ProductPrice">
                                <Form.Control size="lg" type="text" placeholder="Preço do Produto"
                                    defaultValue={props.price}
                                    name="ProductPrice"
                                />
                            </Form.Group>

                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Fechar
                        </Button>
                            <Button type="submit" variant="primary" onClick={handleClose}>
                                Salvar
                        </Button>
                        </Modal.Footer>
                    </form>

                </Modal>
            </>
        );
    }

    async function loadProducts(number = 1) {
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
    for (let number = 1; number <= Math.ceil(total / 4); number++) {
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
                                    <ProductModal id={product.id} name={product.name} price={product.price} />
                                    <Button>
                                        <FiTrash2 size={20}></FiTrash2>
                                    </Button>
                                    <img src={image} alt="imagem" />
                                    <p>{product.name}</p>
                                    <p>{product.price}</p>
                                    <Button>
                                        <FiPlusSquare size={20}> </FiPlusSquare>
                                        Adicionar ao pedido
                                    </Button>
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