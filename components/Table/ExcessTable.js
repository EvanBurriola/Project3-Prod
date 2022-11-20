import styles from '@/styles/manager.module.css'

import ExcessItem from '../Items/ExcessItem'

const ExcessTable = ({excessTable}) => {
    return (
        <div>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Ingredient Name </th>
                        <th> Total Used </th>
                        <th> Inventory Now </th>
                        <th> Percentage Used % </th>
                    </tr>
                </thead>
                <tbody>
                    {excessTable.map(item => {
                        return <ExcessItem item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExcessTable;