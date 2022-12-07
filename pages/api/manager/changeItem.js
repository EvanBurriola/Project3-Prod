import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
      inventoryid,
      ingredientname,
      quantityounces,
      priceperounce,
      averageamountperunitsold,
      minimumquantity,
      itemtype,
    } = req.body
  
    const result = await prisma.inventory.update({
        where: {inventoryid: inventoryid},
        data: {
          ingredientname: ingredientname,
          quantityounces: Number(quantityounces),
          priceperounce: Number(priceperounce),
          averageamountperunitsold: Number(averageamountperunitsold),
          minimumquantity: Number(minimumquantity),
          itemtype: itemtype,
        },
    })

    res.json(result)
  }