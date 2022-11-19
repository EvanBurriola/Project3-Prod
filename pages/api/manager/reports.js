<<<<<<< HEAD
import { prisma, inventory } from '@/lib/prisma'
import {Prisma} from '@prisma/client'

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return
    }

    const { start, end, reportType } = JSON.parse(req.body)
    //console.log(start, end)

    if(reportType == 'restock'){
        const result = await prisma.$queryRaw`SELECT * FROM inventory WHERE quantityounces < minimumquantity ORDER BY inventoryid ASC`
        //console.log(result)
        res.json(result)
    }
    else if(reportType == 'salesPizza'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT * FROM GetPizzaTypeSales(${new Date(start)}, ${new Date(end)});`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                numsales: Number(BigInt.asUintN(64, element.numsales))
            }
        });
        res.json(result)
    }
    else if(reportType == 'salesTopping'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT * FROM GetToppingSales(${new Date(start)}, ${new Date(end)});`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                totalused: Number(BigInt.asUintN(64, element.totalused)),
                numsales: Number(BigInt.asUintN(64, element.numsales))
            }
        });
        res.json(result)
    }
    else if(reportType == 'excess'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT p.IngredientName, SUM(p.QuantityUsed) TotalUsed, inv.QuantityOunces InventoryNow, (SUM(p.QuantityUsed::FLOAT)/(SUM(p.QuantityUsed) + inv.QuantityOunces) * 100)::int percentUsed FROM Pizzas p INNER JOIN PizzaOrders po ON po.PizzaID = p.PizzaID INNER JOIN CustomerOrders co on co.OrderID = po.OrderID INNER JOIN Inventory inv on inv.InventoryID = p.InventoryID WHERE co.OrderDate > ${new Date(start)} AND co.OrderDate < '2023-10-02 00:00:00' GROUP BY p.IngredientName, inv.QuantityOunces HAVING SUM(p.QuantityUsed::FLOAT)/(SUM(p.QuantityUsed) + inv.QuantityOunces) < 0.1 ORDER BY TotalUsed DESC;`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                totalused: Number(BigInt.asUintN(64, element.totalused))
            }
        });
        //console.log(result)
        res.json(result)
    }
    else if(reportType == 'together1'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_BYO FROM (SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN (SELECT id FROM(SELECT pizzatype,po.orderid,MAX (p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'BYO' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'BYO' AND co.OrderDate BETWEEN ${new Date(start)} AND ${new Date(end)})) AS addPizzas GROUP BY pizzatype ORDER BY ordered_with_BYO DESC;`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                ordered_with_byo: Number(BigInt.asUintN(64, element.ordered_with_byo))
            }
        });
        //console.log(result)
        res.json(result)
    }
    else if(reportType == 'together2'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_CHEESE FROM( SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN ( SELECT id FROM( SELECT pizzatype,po.orderid,MAX(p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'Cheese' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'Cheese' AND co.OrderDate BETWEEN ${new Date(start)} AND ${new Date(end)} ) ) as addPizzas GROUP BY pizzatype ORDER BY ordered_with_CHEESE DESC;`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                ordered_with_cheese: Number(BigInt.asUintN(64, element.ordered_with_cheese))
            }
        });
        //console.log(result)
        res.json(result)
    }
    else if(reportType == 'together3'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_1_TOP FROM( SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN ( SELECT id FROM( SELECT pizzatype,po.orderid,MAX(p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = '1-Top' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = '1-Top' AND co.OrderDate BETWEEN ${new Date(start)} AND ${new Date(end)} ) ) as addPizzas GROUP BY pizzatype ORDER BY ordered_with_1_TOP DESC;`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                ordered_with_1_top: Number(BigInt.asUintN(64, element.ordered_with_1_top))
            }
        });
        //console.log(result)
        res.json(result)
    }
    else if(reportType == 'together4'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT p.PizzaType, COUNT(p.PizzaType) AS Ordered_With_Combo FROM PizzaOrders po INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID INNER JOIN Pizzas p ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Cup' AND co.OrderDate BETWEEN ${new Date(start)} AND ${new Date(end)} GROUP BY p.PizzaType ORDER BY Ordered_With_Combo DESC;`
        )
        result.forEach((element, index, arr) => {
            arr[index] = {
                ...element, 
                ordered_with_combo: Number(BigInt.asUintN(64, element.ordered_with_combo))
            }
        });
        //console.log(result)
        res.json(result)
=======
import { prisma } from '@/lib/prisma'

export default async function handler(req, res) {
    if(req.method !== 'GET'){
        return
    }

    const { startDate, endDate, reportType } = JSON.parse(req.body)

    startDate = startDate.getUTCFullYear() + '-' +
    ('00' + (startDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + startDate.getUTCDate()).slice(-2) + ' ' + 
    ('00' + startDate.getUTCHours()).slice(-2) + ':' + 
    ('00' + startDate.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + startDate.getUTCSeconds()).slice(-2);
    endDate = endDate.getUTCFullYear() + '-' +
    ('00' + (endDate.getUTCMonth()+1)).slice(-2) + '-' +
    ('00' + endDate.getUTCDate()).slice(-2) + ' ' + 
    ('00' + endDate.getUTCHours()).slice(-2) + ':' + 
    ('00' + endDate.getUTCMinutes()).slice(-2) + ':' + 
    ('00' + endDate.getUTCSeconds()).slice(-2);

    if(reportType == 'restock'){
        // const result = await prisma.inventory.findMany({
        //     where: {quantity: {lt: minimumquantity}}
        // })
        // res.json(result)
        // return result;
    }
    else if(reportType == 'sales'){

    }
    else if(reportType == 'excess'){

    }
    else if(reportType == 'together'){

>>>>>>> Added delete for inventory and menu
    }
}