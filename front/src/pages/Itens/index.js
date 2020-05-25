import React, { useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { FiShoppingCart, FiTrash2 } from 'react-icons/fi'
import api from '../../services/api'

import './styles.css'


export default function Itens() {
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const handleDeleteItem = async (e, id) =>{
    e.preventDefault()
 

  await api.delete(`itens/${id}`, {
    headers: {
      authorization: 1
    }
  })
    
  }

  

  const [itens, setItens] = useState([])


  useEffect(() => {
    api.get('orders', {
      headers: {
        authorization: 1
      }
    })
      .then(response => {

        setItens(response.data)
      })
  }, [itens])


  const amountXprice = itens.map(value => value.price * value.amount)

  const total = amountXprice.reduce((total, item) => total + item, 0)


  return (
    <div ref={ref}>
      <Button onClick={handleClick}>
        <FiShoppingCart size={20} color="#FFF" />
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="left"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Meus Produtos</Popover.Title>
          <Popover.Content>
            <ul>
              {itens.map((item, index) => (
                <li key={index}>
                  <strong>{item.amount}x {item.name}</strong>
                  <p>{amountXprice[index]}</p>
                  <Button onClick={(e) => handleDeleteItem(e, item.id)} class="button-trash" variant="danger">
                    <FiTrash2 color="#fff" size={15}></FiTrash2>
                  </Button>
                  
                </li>
                
              ))}
              <li class="total">
                Total: {total} 
              </li>
            </ul>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}