import Button from 'react-bootstrap/Button';
import styles from './Objects.module.css'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setActive, removeItem, removePizzaTopping } from '@/store/slices/order'

export const MenuItem = ({butId, name, ...props}) => {
    return (
        <>
            <Button className={`mx-0 ${styles.btnSNS} ${props.style}`} onClick={props.onClick} id={butId} variant="primary" >{name}</Button>
        </>
    )
}

export const OrderCost = ({...props}) => {
    const { subtotal, salestax, ordertotal} = props.order
    
    return (
        <div>
            <p className="fs-5 mb-0">Subtotal: ${subtotal}</p>
            <p className="fs-5 mb-0">Tax: ${salestax}</p>
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
            <Button 
                variant="link" 
                size="sm" 
                onClick={handler} 
                className="py-0"
                >
                <i className="fa-solid fa-xmark"></i>
            </Button>
        </p>
    )
}

export const OrderDisplay = ({item, index}) => {
    const [isEditing, setIsEditing] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isEditing) {
            dispatch(setActive(index))
        }
    }, [isEditing])

    // removes an item from the current order
    const handleRemoveItem = (index, item) => {
        const { price } = item
        const payload = {
            index,
            price
        }
        dispatch(removeItem(payload))
    }

    const handleRemoveTopping = (item) => {
        dispatch(removePizzaTopping(item))
    }
    
    return (
        <>
            <div className="d-flex justify-content-between">
                <p className="fs-3 mb-0">{item.pizzatype}:</p>
                <div>
                    <Button variant="link" onClick={() => setIsEditing(!isEditing)} className="px-1 mx-2">
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button variant="link" onClick={() => handleRemoveItem(index, item)} className="px-1 mx-2">
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