import {prisma} from '@/lib/prisma'

export default async function handler(req, res){
    const{
        id,
    } = JSON.parse(req.body)
    
    const result = await prisma.menuitems.delete({
        where: {typeid: id,},
    })

    res.json(result)
}