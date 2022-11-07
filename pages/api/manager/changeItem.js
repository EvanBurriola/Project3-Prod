import {prisma} from '@/lib/prisma'

export default async function handler(req, res) {
    const {
        inventoryID,
        infoChange,
        changeTo
    } = JSON.parse(req.body)

    console.log(inventoryID, infoChange, changeTo);
    console.log(req.body);
    if(infoChange == "quantityounces"){
        const result = await prisma.inventory.update({
            where: {inventoryid: inventoryID},
            data: {
                quantityounces: Number(changeTo)
              },
        })
        res.json(result);
    }
    else if(infoChange == "priceperounce"){
        const result = await prisma.inventory.update({
            where: {inventoryid: inventoryID},
            data: {
                priceperounce: Number(changeTo)
              },
        })
        res.json(result);
    }
    else if(infoChange == "averageamountperunitsold"){
        const result = await prisma.inventory.update({
            where: {inventoryid: inventoryID},
            data: {
                averageamountperunitsold: Number(changeTo)
              },
        })
        res.json(result);
    }
    else if(infoChange == "minimumquantity"){
        const result = await prisma.inventory.update({
            where: {inventoryid: inventoryID},
            data: {
                minimumquantity: Number(changeTo)
              },
        })
        res.json(result);
    }
    else if(infoChange == "itemtype"){
        const result = await prisma.inventory.update({
            where: {inventoryid: inventoryID},
            data: {
                itemtype: changeTo
              },
        })
        res.json(result);
    }
    // const rawSQL = 'UPDATE inventory SET ' + infoChange + ' = ' + changeTo + ' WHERE ingredientname = \'' + itemChange + '\';';
    // const result = await prisma.$executeRaw(rawSQL);
  
    // res.json(result);
  }