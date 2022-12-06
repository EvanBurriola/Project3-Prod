import styles from '@/styles/manager.module.css'

import ExcessItem from '../Items/ExcessItem'

/**
 * Creating a table for the excess ingredients in the manager view
 *  
 * @author Matthew Janczak
 * @param excessTable Table from the reports query
 */
const ExcessTable = ({excessTable}) => {
    return (
        <div>
            <table className = {styles.tableStyle} id = "excessTable">
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
                        return <ExcessItem key={item.ingredientname} item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ExcessTable;