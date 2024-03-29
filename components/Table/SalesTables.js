import styles from '@/styles/manager.module.css'

import SalesPizzaItem from '../Items/SalesPizzaItem'
import SalesToppingItem from '../Items/SalesToppingItem'

/**
 * Creating a display for the sales table in the manager view
 *  
 * @author Matthew Janczak
 * @param pizzaTable First table of the reports query
 * @param toppingTable Second table of the reports query
 */
const SalesTables = ({pizzaTable, toppingTable}) => {
    return(
        <div className={styles.tableWrapper1}>
            <table className={styles.tableStyle} id = "pizzaTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Number of Sales </th>
                        <th> Revenue </th>
                    </tr>
                </thead>
                <tbody>
                    {pizzaTable.map(item => {
                        return <SalesPizzaItem key={item.pizzatype} item={item} />
                    })
                    }
                </tbody>
            </table>
            <table className = {styles.tableStyle} id = "toppingTable">
                <thead>
                    <tr>
                        <th> Topping </th>
                        <th> Total Used </th>
                        <th> Number of Sales </th>
                    </tr>
                </thead>
                <tbody>
                    {toppingTable.map(item => {
                        return <SalesToppingItem key={item.topping} item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SalesTables;