import style from '@/styles/manager.module.css'

import SalesPizzaItem from '../Items/SalesPizzaItem'

const SalesPizzaTable = ({pizzaTable}) => {
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
        </div>
    )
}

export default SalesPizzaTable;