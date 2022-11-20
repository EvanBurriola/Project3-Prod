import styles from '@/styles/manager.module.css'

import ExcessItem from '../Items/ExcessItem'

const ExcessTable = ({excessTable}) => {
    return (
        <div>
<<<<<<< HEAD
            <table className = {styles.tableStyle} id = "excessTable">
=======
            <table className = {styles.tableStyle} id = "excelDateTable">
>>>>>>> Created Files for tables. Need to fix bug in manager
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
<<<<<<< HEAD
                        return <ExcessItem key={item.ingredientname} item={item} />
=======
                        return <ExcessItem item={item} />
>>>>>>> Created Files for tables. Need to fix bug in manager
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExcessTable;