import React, { useState, useRef, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { FiShoppingCart, FiTrash2, FiCheck } from 'react-icons/fi'
import api from '../../services/api'

import { useHistory } from 'react-router-dom'

import './styles.css'


export default function Itens() {
  const [show, setShow] = useState(false);

  const [target, setTarget] = useState(null);
  const ref = useRef(null);
  const [itens, setItens] = useState([])
  const [order, setOrder] = useState([])

  const history = useHistory()

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const enableButton = (e) => (itens.length <= 0) ? true : false
  

  const handleDeleteItem = async (e, id) => {
    e.preventDefault()

   try {

    await api.delete(`itens/${id}`, {
      headers: {
        authorization: 1
      }
    })
     
   } catch (error) {
     alert(error)
   }
  }

  const handleFinishOrder = async (e) => {
    const data = {}
    e.preventDefault()
    try {
      await api.put(`order/complete/${order}`, data, {
        headers: {
          authorization: 1
        }
      })

      setItens([])

      history.push('/orders')


    } catch (error) {
      alert(error)
    }

  }

  const loadItens = () => {

    api.get('orders', {
      headers: {
        authorization: 1
      }
    })
      .then(response => {

        setItens(response.data)
        setOrder(response.data[0].orders_id)
      })
    
  }

  useEffect(() => {

    loadItens()
    
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
                  <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(amountXprice[index])}</p>

                  <Button onClick={(e) => handleDeleteItem(e, item.id)} className="button-trash" variant="danger">
                    <FiTrash2 color="#fff" size={15}></FiTrash2>
                  </Button>

                </li>
              ))}
              <li className="total">
                Total: {Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(total)}

              </li>

            </ul>
            <Button disabled={enableButton()}  className="btn-sucess" onClick={(e) => handleFinishOrder(e)} variant="success">
              <FiCheck color="#fff" size={15}></FiCheck> Finalizar
            </Button>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}