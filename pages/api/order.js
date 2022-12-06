import { prisma } from '@/lib/prisma'

// NOTE: prisma doesn't support nested createMany statements
//       so we need to first create the order + pizzaorders
//       then create toppings for each pizzaorder. We need
//       to wait for the first response then iteratively
//       push new items.
// TODO: make this more efficient by pushing at the same time
// TODO: fix issue with transaction seeming to fail for multiple
//       writes to the same row in the inventory
export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return
    }

    const { order } = JSON.parse(req.body)
    const { orderItems } = order
    let toppings = []

    // remove unecessary args in order + keep list of all ingredients
    // TODO: refactor this so future change to order won't need to
    //       consider this
    delete order.orderItems
    delete order.activeOrder
    delete order.status
    orderItems.forEach((item) => {
        toppings.push(item.toppings);
        delete item.pizzatype
        delete item.toppings
    })

    // use a transaction since the whole order needs to be made
    // and if it fails, the changes should be rolled back
    const result = await prisma.$transaction(async (client) => {
        // push basic order info and each menu item to relational table
        const createOrder = await client.customerorders.create({
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

        // push each topping to the pizzas table and update inventory
        for (var i = 0; i < createOrder.pizzaorders.length; i++) {
            const id = createOrder.pizzaorders[i].pizzaid
            toppings[i].forEach(async (top) => {
                top.pizzaid = id
                // itemtype prop not in pizza table and causes
                // errors when pushing to table
                delete top.itemtype
                // update each topping quantity in inventory
                await client.inventory.update({
                    where: {
                        inventoryid: top.inventoryid
                    },
                    data: {
                        quantityounces: {
                            decrement: top.quantityused
                        }
                    }
                })
            })
            await client.pizzas.createMany({
                data: toppings[i]
            })
        }

        // this only returns the order without the toppings
        return createOrder
    })

    res.json(result);
}