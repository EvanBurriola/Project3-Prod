import styles from './Receipt.module.css'

import Col from 'react-bootstrap/Col'

import moment from 'moment'

/**
 * Creating what a page for the reciept after an order is made
 *  
 * @author Axel Ramone
 */
const Receipt = ({info}) => {
    const { order, pizzas } = info
    const orderDate = moment(order.orderdate).local().format("MMMM Do [at] h:mmA")


    const renderItem = (item) => {
        const type = item.pizzas[0].pizzatype
        return (
            <div className='d-flex w-100 justify-content-between'>
                <p>{type}</p>
                <p>${item.price}</p>
            </div>
        )
    }

    return (
        <Col md={6}>
            <div className={`mb-4`}>
                <h3>Order <span className='fw-bolder mb-3'>#{order.orderid}</span></h3>
                <h5 className={`text-start`}>Placed on {orderDate}</h5>
            </div>
            <div>
                {pizzas.map(p => renderItem(p))}
            </div>
            <div className={`text-end`}>
                <p className='mb-0'>Subtotal: ${order.subtotal}</p>
                <p className='mb-0'>Tax: ${order.salestax}</p>
                <h4 className='mb-0'>Total: ${order.ordertotal}</h4>
            </div>
        </Col>
    )
}

export default Receipt