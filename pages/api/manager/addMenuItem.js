import {prisma} from '@/lib/prisma'

export default async function handler(req, res){
    const{
        newItemName,
        newItemPrice,
    } = req.body
    console.log(newItemName, newItemPrice)
    const result = await prisma.menuitems.create({
        data: {
            pizzatype: newItemName,
            itemprice: newItemPrice,
        },
    })

    res.json(result)
}