import Button from 'react-bootstrap/Button';
import styles from '@/styles/server.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActive, removePizzaTopping } from '@/store/slices/order'

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
    )
}

export const RemoveTopping = ({handler, ...props}) => {
    const { ingredient } = props
    return (
        <p className="fs-5 ps-4 mb-0">- {ingredient.ingredientname} 
            <Button variant="link" size="sm" onClick={handler}>
                <i className="fa-solid fa-xmark"></i>
            </Button>
        </p>
    )
}

export const OrderDisplay = ({item, index, deleteHandle}) => {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()

    // sets the active item and allows for editing an item in
    // the order
    const handleEdit = (idx) => {
        setIsEditing(!isEditing)
        dispatch(setActive(idx))
    }

    const handleRemoveTopping = (item) => {
        dispatch(removePizzaTopping(item))
    }
    
    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="fs-3 mb-0">{item.pizzatype}:</p>
                <div>
                    <Button variant="link" onClick={() => handleEdit(index)} className="px-1 mx-2">
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button variant="link" onClick={deleteHandle} className="px-1 mx-2">
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                </div>
            </div>
            {isEditing ? 
                item.toppings.map(top => {
                    return <RemoveTopping 
                        key={top.inventoryid} 
                        ingredient={top}
                        handler={() => handleRemoveTopping(top)}
                    />
                }) :
                item.toppings.map(top => {
                    return <Selected key={top.inventoryid} ingredient={top} />
                })
            }
            
        </>
    )
}