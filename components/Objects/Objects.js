import Button from 'react-bootstrap/Button';
import styles from '@/styles/server.module.css'


export const MenuItem = ({butId, name, ...props}) => {
    return (
        <>
            <Button className={styles.button} onClick={props.onClick} id={butId} variant="primary" >{name}</Button>
        </>
<<<<<<< HEAD
    )
}

export const Selected = ({...props}) => {
    const { ingredient } = props
    return (
        <p className="fs-5 ps-4 mb-0">- {ingredient.ingredientname}</p>
    )
}

export const OrderCost = ({...props}) => {
    const { subtotal, salestax, ordertotal} = props.order
    
    return (
        <div>
            <p className="fs-5">Subtotal: ${subtotal}</p>
            <p className="fs-5">Tax: ${salestax}</p>
            <p className="fs-3">Total: ${ordertotal}</p>
=======
    )
}

export const Selected = ({...props}) => {
    const { ingredient } = props
    return (
        <p className="fs-5">- {ingredient.ingredientname}</p>
    )
}

export const OrderCost = ({...props}) => {
    const { subTotal, tax, total} = props.order
    
    return (
        <div className={styles.orderCostPos}>
            <p className="fs-2">Subtotal: ${subTotal}</p>
            <p className="fs-5">Tax: ${tax}</p>
            <p className="fs-5">Total: ${total}</p>
>>>>>>> ADDED: button functionality + FIXED: models and view components to better display dynamic buttons
        </div>
    )
}

export const OrderDisplay = ({item}) => {
    return (
        <div>
<<<<<<< HEAD
            <p className="fs-3 mb-0">{item.pizzatype}:</p>
            {item.toppings.map(top => {
                return <Selected key={top.inventoryid} ingredient={top} />
=======
            <p className="fs-2">{item.pizzatype}</p>
            {item.toppings.map(top => {
                return <Selected ingredient={top} />
>>>>>>> ADDED: button functionality + FIXED: models and view components to better display dynamic buttons
            })
            }
        </div>
    )
}