import Button from 'react-bootstrap/Button';
import styles from './Objects.module.css'
import Col from 'react-bootstrap/Col'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
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
            <p className="fs-5 mb-0">Subtotal: ${Number.parseFloat(subtotal).toFixed(2)}</p>
            <p className="fs-5 mb-0">Tax: ${Number.parseFloat(salestax).toFixed(2)}</p>
            <p className="fs-3">Total: ${Number.parseFloat(ordertotal).toFixed(2)}</p>
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
                className={`${styles.btnDelete} py-0`}
                
                >
                <i className="fa-solid fa-xmark"></i>
            </Button>
        </p>
    )
}

export const OrderDisplay = ({item, index}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [btnStyle, setBtnStyle] = useState(styles.btnNotEdit)
    const currentItem = useSelector((state) => state.order.activeOrder)
    const dispatch = useDispatch()

    useEffect(() => {
        if (isEditing) {
            setBtnStyle(styles.btnEdit)
            dispatch(setActive(index))
        } else {
            setBtnStyle(styles.btnNotEdit)
        }
    }, [isEditing, dispatch, index])

    // track the current active item and if it changes
    // make sure to quit editor
    useEffect(() => {
        if (currentItem != index) {
            setIsEditing(false)
        }
    }, [currentItem, index])

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
        <Col md={12} className={`${isEditing ? styles.editContainer : ""} ${isEditing ? "shadow" : ""} py-2`}>
            <div className="d-flex justify-content-between px-2">
                <p className="fs-3 mb-0">{item.pizzatype}:</p>
                <div>
                    <Button variant="link" className={`${btnStyle} px-1 mx-2`} onClick={() => setIsEditing(!isEditing)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button variant="link" className={`${styles.btnEdit} ${styles.btnDelete} px-1 mx-2`} onClick={() => handleRemoveItem(index, item)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                </div>
            </div>
            {isEditing ? 
                item.toppings.map(top => {
                    // don't allow users to remove dough from a pizza
                    if (top.itemtype == "dough") {
                        return <Selected key={top.inventoryid} ingredient={top} />
                    } else {
                        return <RemoveTopping 
                            key={top.inventoryid} 
                            ingredient={top}
                            handler={() => handleRemoveTopping(top)}
                        />
                    }
                }) :
                item.toppings.map(top => {
                    return <Selected key={top.inventoryid} ingredient={top} />
                })
            }
            
        </Col>
    )
}