import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
        menuID,
        itemPrice
    } = JSON.parse(req.body)
  
    const result = await prisma.menuitems.update({
        where: {typeid: menuID},
        data: {
            itemprice: Number(itemPrice)
        },
    })
  
    res.json(result)
  }