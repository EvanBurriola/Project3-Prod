import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
      itemName,
      quantity,
      price,
      amountUsedPerSale,
      minimumQuantityNeeded,
      itemType,
    } = req.body
  
    const result = await prisma.inventory.create({
        data: {
          ingredientname: itemName,
          quantityounces: quantity,
          priceperounce: price,
          averageamountperunitsold: amountUsedPerSale,
          minimumquantity: minimumQuantityNeeded,
          itemtype: itemType,
        },
    })
  
    res.json(result)
  }