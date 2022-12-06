import Button from 'react-bootstrap/Button';
import styles from './Objects.module.css'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import Badge from 'react-bootstrap/Badge'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setActive, removeItem, removePizzaTopping } from '@/store/slices/order'

/**
 * Creating the buttons for all the ingredients within the server and customer views
 * @author Brandon Longuet */ 
export const MenuItem = ({butId, name, ...props}) => {
    return (
        <>
            <Button className={`mx-0 ${styles.btnSNS} ${props.className}`} onClick={props.onClick} id={butId} variant="primary" >{name}</Button>
        </>
    )
}

/**
 * Creating the display for order costs in the server and customer views
 * @author Brandon Longuet */ 
export const OrderCost = ({...props}) => {
    const { subtotal, salestax, ordertotal} = props.order
    
    return (
        <div className={`w-100`}>
            <div className={`d-flex justify-content-between`}>
                <p className="fs-5 mb-0">Subtotal:</p>
                <p className="fs-5 mb-0">${Number.parseFloat(subtotal).toFixed(2)}</p>
            </div>
            <div className={`d-flex justify-content-between pb-1`}>
                <p className="fs-5 mb-0">Tax:</p>
                <p className="fs-5 mb-0">${Number.parseFloat(salestax).toFixed(2)}</p>
            </div>
            <div className={`d-flex justify-content-between pt-1 ${styles.priceBorder}`}>
                <p className="fs-3">Total:</p>
                <p className="fs-3">${Number.parseFloat(ordertotal).toFixed(2)}</p>
            </div>
        </div>
    )
}

export const Selected = ({ingredient, count, ...props}) => {
    return (
        <div className="d-flex ps-4 mb-0 align-items-center">
            <Badge pill bg="light" text="dark" className="me-2">{count}</Badge>
            <span className='text-light'>{ingredient.ingredientname}</span>
        </div>
    )
}

export const RemoveTopping = ({handler, ingredient, count, ...props}) => {
    return (
        <div className="d-flex ps-4 mb-0 align-items-center">
            <Badge pill bg="light" text="dark" className="me-2">{count}</Badge>
            <span className='text-light'>{ingredient.ingredientname}</span>
            <Button 
                variant="link" 
                size="sm" 
                onClick={handler} 
                className={`${styles.btnDelete} py-0 h-auto`}
                
                >
                <i className="fa-solid fa-xmark align-middle"></i>
            </Button>
        </div>
    )
}

export const OrderDisplay = ({item, index}) => {
    const [isActive, setIsActive] = useState(true)
    const [btnStyle, setBtnStyle] = useState(styles.btnNotEdit)
    const currentItem = useSelector((state) => state.order.activeOrder)
    // ensures that toppings/items in the order will be unique
    const toppings = [...new Map(item.toppings.map(item => [item['inventoryid'], item])).values()]
    const dispatch = useDispatch()

    // gets the frequency of an item in the order
    const count = (key) => {
        return (item.toppings.filter(v => v.inventoryid == key.inventoryid)).length
    }

    // updates display styling based on whether or not this display
    // is showing the active item in the order
    useEffect(() => {
        if (isActive) {
            setBtnStyle(styles.btnEdit)
            dispatch(setActive(index))
        } else {
            setBtnStyle(styles.btnNotEdit)
        }
    }, [isActive, dispatch, index])

    // track the current active item in the order (includes editing)
    useEffect(() => {
        if (currentItem != index) {
            setIsActive(false)
        } else {
            setIsActive(true)
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
       
        <div 
            className={`pt-2 pb-3 shadow ${styles.itemContainer} ${isActive ? styles.active : styles.default}`}   
        >
            <div className={`d-flex justify-content-between px-2`}>
                <p className="fs-5 mb-0">{item.pizzatype}:</p>
                <div>
                    <Button variant="link" className={`${btnStyle} px-1 mx-2`} onClick={() => setIsActive(true)}>
                        <i className="fa-regular fa-pen-to-square"></i>
                    </Button>
                    <Button variant="link" className={`${styles.btnEdit} ${styles.btnDelete} px-1 mx-2`} onClick={() => handleRemoveItem(index, item)}>
                        <i className="fa-solid fa-trash-can"></i>
                    </Button>
                </div>
            </div>
            {isActive ? 
                toppings.map(top => {
                    // don't allow users to remove dough from a pizza
                    if (top.itemtype == "dough") {
                        return <Selected key={top.inventoryid} ingredient={top} count={count(top)} />
                    } else {
                        return <RemoveTopping 
                            key={top.inventoryid} 
                            ingredient={top}
                            count={count(top)}
                            handler={() => handleRemoveTopping(top)}
                        />
                    }
                }) :
                toppings.map(top => {
                    return <Selected key={top.inventoryid} ingredient={top} count={count(top)} />
                })
            }
        </div>
    )
}