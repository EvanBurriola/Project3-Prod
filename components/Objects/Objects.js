import Button from 'react-bootstrap/Button';
import styles from '@/styles/server.module.css'


export const MenuItem =  menuItem => {
    const { butId, type} = menuItem
    return (
        <div>
            <Button className={styles.button} id={butId} variant="primary" >{type}</Button>
        </div>
    )
}

export const Ingredient =  ingredient => {
    const { butId ,ingredientname} = ingredient
    return (
        <div>
            <Button className={styles.button} id={butId} variant="primary">{ingredientname}</Button>
        </div>
    )
}

export const Selected =  selected => {
    const { ingredient} = selected
    return (
        <p>- {ingredient.ingredientname}</p>
    )
}

export const OrderCost = orderCost => {
    const { LabelId, subtotal, tax, total} = orderCost
    
    return (
        <div className={styles.orderCostPos}>
            <p>Subtotal: ${subtotal}</p>
            <p>Tax: ${tax}</p>
            <p>Total: ${total}</p>
        </div>
    )
}

export const OrderDisplay = orderDisplay => {
    const { orderId, type ,toppings} = orderDisplay
    
    return (
        <div>
            <p>{type}</p>
            {toppings.length > 0 ? toppings.map(
                item => <Selected ingredient={item} />
            ) : [<p>No tracks are found.</p>]}
        </div>
    )
}