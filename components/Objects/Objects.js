import Button from 'react-bootstrap/Button';
import styles from '@/styles/server.module.css'


export const MenuItem = ({butId, name, ...props}) => {
    return (
        <>
            <Button className={styles.button} onClick={props.onClick} id={butId} variant="primary" >{name}</Button>
        </>
    )
}

export const OrderCost = ({...props}) => {
    const { subtotal, salestax, ordertotal} = props.order
    
    return (
<<<<<<< HEAD
        <div>
            <p className="fs-5">Subtotal: ${subtotal}</p>
            <p className="fs-5">Tax: ${salestax}</p>
            <p className="fs-3">Total: ${ordertotal}</p>
        </div>
    )
}

export const Selected = ({...props}) => {
    const { ingredient } = props
    return (
        <p className="fs-5 ps-4 mb-0">- {ingredient.ingredientname}</p>
=======
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
        </div>
>>>>>>> Server Navbar Done
    )
}

export const OrderDisplay = ({item}) => {
    return (
        <div>
<<<<<<< HEAD

=======
>>>>>>> Server Navbar Done
            <p className="fs-3 mb-0">{item.pizzatype}:</p>
            {item.toppings.map(top => {
                return <Selected key={top.inventoryid} ingredient={top} />
            })
            }
        </div>
    )
}