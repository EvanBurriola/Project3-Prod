import { createSlice } from '@reduxjs/toolkit'
import { TAX_RATE, MAX_TOPPINGS } from '@/lib/constants/index'

const formatDecimals = (value) => {
    return Number(Math.round(parseFloat(value + 'e' + 2)) + 'e-' + 2)
}

// checks the pizza type against the max number of toppings
// allowed and implicitly doesn't allow for choosing over
// the max number of toppings on a pizza
const canAddToPizza = (pizza, topping) => {
    if (topping.itemtype === "other") {
        return true;
    }

    const max = MAX_TOPPINGS.find((type) => {
        return pizza.pizzatype === type.pizzatype
    }).max

    const types = pizza.toppings.map((v) => v.itemtype)
    const hasDough = types.includes('dough')
    const hasCheese = types.includes('cheese')
    const hasSauce = types.includes('sauce')
    const numtoppings = types.filter((type) => type === "topping").length

    // check if you can add a new item if its a basic item
    if (topping.itemtype === 'dough') {
        return !hasDough
    }

    if (topping.itemtype === 'cheese') {
        return !hasCheese
    }

    if (topping.itemtype === 'sauce') {
        return !hasSauce
    }

    // otherwise check against max toppings allowed
    return numtoppings < max
}

// setup initial state of all orders
// TODO: remove preset values
const initialState = {
    orderItems: [],
    customername: "Server View test",
    employeename: "Axel Ramone",
    employeeid: 1,
    subtotal: 0,
    salestax: 0,
    ordertotal: 0,
    activeOrder: 0,
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setCustomer(state, action) {
            state.customername = action.payload;
        },
        setEmployee(state, action) {
            const { employee, id } = action.payload
            state.employeename = employee
            state.employeeid = id
        },
        addItem(state, action) {
            const { price } = action.payload
            state.orderItems.push(action.payload)
            state.activeOrder = state.orderItems.length - 1
            // update price based on current pizza
            let sub = state.subtotal + price
            let tax = state.salestax + (TAX_RATE * price)
            let total = state.ordertotal + ((1 + TAX_RATE) * price)

            state.subtotal = formatDecimals(sub)
            state.salestax = formatDecimals(tax)
            state.ordertotal = formatDecimals(total)
        },
        removeItem(state, action) {
            // removes item from order and subtracts cost from
            // subtotal, tax, and total
            const { index, price} = action.payload
            state.orderItems.splice(index, 1)

            let sub = state.subtotal - price
            let tax = state.salestax - (TAX_RATE * price)
            let total = state.ordertotal - ((1 + TAX_RATE) * price)
            state.subtotal = formatDecimals(sub)
            state.salestax = formatDecimals(tax)
            state.ordertotal = formatDecimals(total)
        },
        addPizzaTopping(state, action) {
            const idx = state.activeOrder
            const currItem = state.orderItems[idx]
            if (!currItem) {
                return
            }

            // accounts for dough being a topping, don't add
            // to current pizza if we will exceed the maximum
            if (canAddToPizza(currItem, action.payload)) {
                state.orderItems[idx].toppings.push(action.payload)
            }
        },
        removePizzaTopping(state, action) {
            const idx = state.activeOrder
            const top = state.orderItems[idx].toppings.findIndex(t => t.inventoryid == action.payload.inventoryid)
            if (top < 0) return
            state.orderItems[idx].toppings.splice(top, 1)
        },
        clearOrder(state) {
            state.orderItems = []
            state.customername = ""
            state.subtotal = 0
            state.salestax = 0
            state.ordertotal = 0
            state.activeOrder = 0
        },
        setActive(state, action) {
            // sets the active item to the payload or last index if payload
            // is too large
            state.activeOrder = (action.payload < state.orderItems.length) ?
                action.payload : state.orderItems.length - 1
        },
    },
})

export const { 
    setCustomer, 
    setEmployee,
    addItem,
    removeItem, 
    addPizzaTopping,
    removePizzaTopping,
    clearOrder,
    setActive,
} = orderSlice.actions

export default orderSlice.reducer
