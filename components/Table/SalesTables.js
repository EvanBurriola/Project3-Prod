import styles from '@/styles/manager.module.css'

import SalesPizzaItem from '../Items/SalesPizzaItem'
import SalesToppingItem from '../Items/SalesToppingItem'

const SalesTables = ({pizzaTable, toppingTable}) => {
    return(
        <div>
            <table className={styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Number of Sales </th>
                        <th> Revenue </th>
                    </tr>
                </thead>
                <tbody>
                    {pizzaTable.map(item => {
                        return <SalesPizzaItem item={item} />
                    })
                    }
                </tbody>
            </table>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Topping </th>
                        <th> Total Used </th>
                        <th> Number of Sales </th>
                    </tr>
                </thead>
                <tbody>
                    {toppingTable.map(item => {
                        return <SalesToppingItem item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default SalesTables;