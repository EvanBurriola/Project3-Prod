import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
        typeid,
        pizzatype,
        itemprice,

    } = req.body
  
    const result = await prisma.menuitems.update({
        where: {typeid: typeid},
        data: {
            pizzatype: pizzatype,
            itemprice: Number(itemprice),
        },
    })
  
    res.json(result)
  }