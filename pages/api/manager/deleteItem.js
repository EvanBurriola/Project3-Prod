import {prisma} from '@/lib/prisma'

export default async function handler(req, res){
    const {
        inventoryID
    } = JSON.parse(req.body)
    
    const result = await prisma.inventory.delete({
        where: {inventoryid: inventoryID},
    })

    res.json(result)
}