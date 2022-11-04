import { createSlice } from '@reduxjs/toolkit'

const TAX_RATE = 0.0825

const formatDecimals = (value) => {
    return Number(Math.round(parseFloat(value + 'e' + 2)) + 'e-' + 2)
}

// setup initial state of all orders
const initialState = {
    orderItems: [],
    currentPizza: {
        toppings: []
    },
    name: "",
    employee: "",
    employeeid: -1,
    subTotal: 0,
    tax: 0,
    total: 0,
    status: null
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addCustomer(state, action) {
            state.name = action.payload;
        },
        addEmployee(state, action) {
            const { employee, id } = action.payload
            state.employee = employee
            state.employeeID = id
        },
        newPizza(state, action) {
            // reset the current pizza (assuming pizza has been
            // pushed to orderItems already)
            state.currentPizza = action.payload
            // update price based on current pizza
            let sub = state.subTotal + action.payload.price
            let tax = state.tax + (TAX_RATE * action.payload.price)
            let total = state.total + ((1 + TAX_RATE) * action.payload.price)

            state.subTotal = formatDecimals(sub)
            state.tax = formatDecimals(tax)
            state.total = formatDecimals(total)
        },
        finishPizza(state) {
            state.orderItems.push(state.currentPizza)
        },
        addItem(state, action) {
            state.orderItems.push(action.payload)
        },
        addPizzaTopping(state, action) {
            state.currentPizza.toppings.push(action.payload)
        },
    },
})

export const { 
    addCustomer, 
    addEmployee, 
    newPizza, 
    finishPizza, 
    addItem, 
    addPizzaTopping 
} = orderSlice.actions

export default orderSlice.reducer
