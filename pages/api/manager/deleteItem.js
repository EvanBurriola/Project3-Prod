import {prisma} from '@/lib/prisma'

export default async function handler(req, res){
    const {
        inventoryID
    } = JSON.parse(req.body)
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> Created Files for tables. Need to fix bug in manager

    const changePizzas = await prisma.pizzas.updateMany({
        where: {inventoryid: inventoryID},
        data: {inventoryid: 48}
    })
<<<<<<< HEAD
=======
>>>>>>> Added delete for inventory and menu
=======
>>>>>>> Created Files for tables. Need to fix bug in manager
    
    const result = await prisma.inventory.delete({
        where: {inventoryid: inventoryID},
    })

    res.json(result)
}