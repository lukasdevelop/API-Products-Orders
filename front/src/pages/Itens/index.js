import React, {useState, useRef, useEffect} from 'react'
import Button from 'react-bootstrap/Button'
import Overlay from 'react-bootstrap/Overlay'
import Popover from 'react-bootstrap/Popover'
import { FiShoppingCart } from 'react-icons/fi'
import api from '../../services/api'


export default function Itens() {
const [show, setShow] = useState(false);
  const [target, setTarget] = useState(null);
  const ref = useRef(null);

  const handleClick = (event) => {
    setShow(!show);
    setTarget(event.target);
  };

  const [itens, setItens] = useState([])

    useEffect(() => {
        api.get('orders', {
          headers: {
            authorization: 1
          }
        })
            .then(response => {
              console.log(response.data)
              setItens(response.data)
            })
    }, [])

  return (
    <div ref={ref}>
      <Button onClick={handleClick}>
        <FiShoppingCart size={20} color="#FFF" />
      </Button>

      <Overlay
        show={show}
        target={target}
        placement="bottom"
        container={ref.current}
        containerPadding={20}
      >
        <Popover id="popover-contained">
          <Popover.Title as="h3">Meus Produtos</Popover.Title>
          <Popover.Content>
            <ul>
              {itens.map(item => (
                <li key={item.id}>{item.name}</li>
              ))}
            </ul>
          </Popover.Content>
        </Popover>
      </Overlay>
    </div>
  );
}