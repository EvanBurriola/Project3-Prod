export const TAX_RATE = 0.0825

// TODO: maybe add this to DB so it can be dynamic
export const MAX_TOPPINGS = [
    {
        pizzatype: '1-Topping',
        max: 1
    },
    {
        pizzatype: 'Cheese',
        max: 0
    },
    {
        pizzatype: 'Build Your Own',
        max: 4
    }
]