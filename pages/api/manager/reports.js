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

    }
}