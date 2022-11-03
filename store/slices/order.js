import { createSlice } from '@reduxjs/toolkit'

const TAX_RATE = 0.0825

// setup initial state of all orders
const initialState = {
    orderItems: [],
    currentPizza: {},
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
            state.subTotal += state.currentPizza.price
            state.tax += TAX_RATE * state.currentPizza.price
            state.total += ((1 + TAX_RATE) * state.currentPizza.price)
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
