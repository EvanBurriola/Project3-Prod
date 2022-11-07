import { prisma } from '@/lib/prisma'

// NOTE: prisma doesn't support nested createMany statements
//       so we need to first create the order + pizzaorders
//       then create toppings for each pizzaorder. We need
//       to wait for the first response then iteratively
//       push new items.
// TODO: make this more efficient by pushing at the same time
// TODO: remove quantity from inventory for each topping
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return
    }

    const order = req.body
    const { orderItems } = order
    let toppings = []

    // remove unecessary args in order + keep list of all ingredients
    delete order.orderItems
    delete order.currentPizza
    orderItems.forEach((item) => {
        toppings.push(item.toppings);
        delete item.pizzatype
        delete item.toppings
    })

    // push basic order info and each menu item to relational table
    const createOrder = await prisma.customerorders.create({
        data: {
            ...order,
            pizzaorders: {
                create: orderItems,
            }
        },
        include: {
            pizzaorders: true,
        }
    })

    // push each topping to the pizzas table
    for (var i = 0; i < createOrder.pizzaorders.length; i++) {
        const id = createOrder.pizzaorders[i].pizzaid
        toppings[i].forEach((top) => {
            top.pizzaid = id
        })
        const createToppings = await prisma.pizzas.createMany({
            data: toppings[i]
        })
    }

    res.json(createOrder);
}