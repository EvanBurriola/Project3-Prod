import { prisma, inventory } from '@/lib/prisma'
import {Prisma} from '@prisma/client'

function toJson(data) {
    return JSON.stringify(data, (_, v) => typeof v === 'bigint' ? `${v}n` : v)
        .replace(/"(-?\d+)n"/g, (_, a) => a);
}

export default async function handler(req, res) {
    if(req.method !== 'POST'){
        return
    }

    const { startDate, endDate, reportType } = JSON.parse(req.body)

    if(reportType == 'restock'){
        const result = await prisma.$queryRaw`SELECT * FROM inventory WHERE quantityounces < minimumquantity`
        console.log(result)
        res.json(result)
    }
    else if(reportType == 'salesPizza'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT * FROM GetPizzaTypeSales('${startDate}', '${endDate}');`
        )
        console.log(result)
        res.json(toJson(result))
    }
    else if(reportType == 'salesTopping'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT * FROM GetToppingSales('${startDate}', '${endDate}');`
        )
        console.log(result)
        res.json(toJson(result))
    }
    else if(reportType == 'excess'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT p.IngredientName, SUM(p.QuantityUsed) TotalUsed, inv.QuantityOunces InventoryNow, (SUM(p.QuantityUsed::FLOAT)/(SUM(p.QuantityUsed) + inv.QuantityOunces) * 100)::int percentUsed FROM Pizzas p INNER JOIN PizzaOrders po ON po.PizzaID = p.PizzaID INNER JOIN CustomerOrders co on co.OrderID = po.OrderID INNER JOIN Inventory inv on inv.InventoryID = p.InventoryID WHERE co.OrderDate > '${startDate}' AND co.OrderDate < '2023-10-02 00:00:00' GROUP BY p.IngredientName, inv.QuantityOunces HAVING SUM(p.QuantityUsed::FLOAT)/(SUM(p.QuantityUsed) + inv.QuantityOunces) < 0.1 ORDER BY TotalUsed DESC;`
        )
        console.log(result)
        res.json(result)
    }
    else if(reportType == 'together1'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_BYO FROM (SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN (SELECT id FROM(SELECT pizzatype,po.orderid,MAX (p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'BYO' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'BYO' AND co.OrderDate BETWEEN ${startDate} AND ${endDate})) AS addPizzas GROUP BY pizzatype ORDER BY ordered_with_BYO DESC;`
        )
        console.log(result)
        res.json(result)
    }
    else if(reportType == 'together2'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_CHEESE FROM( SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN ( SELECT id FROM( SELECT pizzatype,po.orderid,MAX(p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'Cheese' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = 'Cheese' AND co.OrderDate BETWEEN ${startDate} AND ${endDate} ) ) as addPizzas GROUP BY pizzatype ORDER BY ordered_with_CHEESE DESC;`
        )
        console.log(result)
        res.json(result)
    }
    else if(reportType == 'together3'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT pizzatype, COUNT(pizzatype) as ordered_with_1_TOP FROM( SELECT pizzatype,po.orderid,p.pizzaid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID WHERE p.IngredientName = 'Dough' AND p.pizzaid NOT IN ( SELECT id FROM( SELECT pizzatype,po.orderid,MAX(p.pizzaid) as id From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = '1-Top' GROUP BY pizzatype,po.orderid ORDER BY orderid) AS tbl ) AND po.orderid IN ( SELECT DISTINCT po.orderid From Pizzas p INNER JOIN PizzaOrders po ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Dough' AND pizzatype = '1-Top' AND co.OrderDate BETWEEN ${startDate} AND ${endDate} ) ) as addPizzas GROUP BY pizzatype ORDER BY ordered_with_1_TOP DESC;`
        )
        console.log(result)
        res.json(result)
    }
    else if(reportType == 'together4'){
        const result = await prisma.$queryRaw(
            Prisma.sql`SELECT p.PizzaType, COUNT(p.PizzaType) AS Ordered_With_Combo FROM PizzaOrders po INNER JOIN CustomerOrders co ON po.OrderID = co.OrderID INNER JOIN Pizzas p ON p.PizzaID = po.PizzaID WHERE p.IngredientName = 'Cup' AND co.OrderDate BETWEEN ${startDate} AND ${endDate} GROUP BY p.PizzaType ORDER BY Ordered_With_Combo DESC;`
        )
        console.log(result)
        res.json(result)
    }
}