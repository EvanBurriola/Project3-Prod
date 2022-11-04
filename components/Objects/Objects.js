import Button from 'react-bootstrap/Button';
import styles from '@/styles/server.module.css'


export const MenuItem = ({butId, name, ...props}) => {
    return (
        <>
            <Button className={styles.button} onClick={props.onClick} id={butId} variant="primary" >{name}</Button>
        </>
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
        </div>
    )
}

export const OrderDisplay = ({item}) => {
    return (
        <div>
            <p className="fs-2">{item.pizzatype}</p>
            {item.toppings.map(top => {
                return <Selected ingredient={top} />
            })
            }
        </div>
    )
}