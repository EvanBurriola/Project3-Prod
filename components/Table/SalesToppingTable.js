import styles from '@/styles/manager.module.css'

import SalesToppingItem from '../Items/SalesToppingItem'

const SalesToppingTable = ({toppingTable}) => {
    return(
        <div>
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

export default SalesToppingTable;