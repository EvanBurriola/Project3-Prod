import { createSlice } from '@reduxjs/toolkit'

const TAX_RATE = 0.0825

const formatDecimals = (value) => {
    return Number(Math.round(parseFloat(value + 'e' + 2)) + 'e-' + 2)
}

// setup initial state of all orders
// TODO: remove preset values
const initialState = {
    orderItems: [],
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
    customername: "Server View test",
    employeename: "Axel Ramone",
    employeeid: 1,
=======
    customername: "",
    employeename: "",
    employeeid: -1,
>>>>>>> ENHANCE: redux state properties now inline with prisma schema
=======
    customername: "Server View test",
    employeename: "Axel Ramone",
    employeeid: 1,
>>>>>>> UPDATE: order can now be placed through server view
=======
    customername: "Server View test",
    employeename: "Axel Ramone",
    employeeid: 1,
>>>>>>> Server Navbar Done
    subtotal: 0,
    salestax: 0,
    ordertotal: 0,
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
            // update price based on current pizza
            let sub = state.subtotal + price
            let tax = state.salestax + (TAX_RATE * price)
            let total = state.ordertotal + ((1 + TAX_RATE) * price)

            state.subtotal = formatDecimals(sub)
            state.salestax = formatDecimals(tax)
            state.ordertotal = formatDecimals(total)
        },
        addPizzaTopping(state, action) {
            const lastItem = state.orderItems.length - 1
            state.orderItems[lastItem].toppings.push(action.payload)
        },
        clearOrder(state) {
            state.orderItems = []
            state.customername = ""
            state.subtotal = 0
            state.salestax = 0
            state.ordertotal = 0
        }
    },
})

export const { 
    setCustomer, 
    setEmployee,
    addItem, 
    addPizzaTopping,
    clearOrder 
} = orderSlice.actions

export default orderSlice.reducer
