import {prisma} from '@/lib/prisma'

export default async function handler(req, res){
    const {
        inventoryID
    } = JSON.parse(req.body)

    const changePizzas = await prisma.pizzas.updateMany({
        where: {inventoryid: inventoryID},
        data: {inventoryid: 48}
    })
    
    const result = await prisma.inventory.delete({
        where: {inventoryid: inventoryID},
    })

    res.json(result)
}