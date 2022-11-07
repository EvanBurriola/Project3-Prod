import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
        itemID,
        curQuantity,
        quantityRestock
    } = JSON.parse(req.body)


    const result = await prisma.inventory.update({
        where: {inventoryid: itemID},
        data: {
            quantityounces: curQuantity + Number(quantityRestock)
        },
    })
  
    res.json(result)
  }