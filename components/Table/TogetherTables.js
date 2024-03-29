import styles from '@/styles/manager.module.css'

import Together1Item from '../Items/Together1Item'
import Together2Item from '../Items/Together2Item'
import Together3Item from '../Items/Together3Item'
import Together4Item from '../Items/Together4Item'

/**
 * Creating a display for the What Sales Together tables in the manager view
 *  
 * @author Matthew Janczak
 * @param together1Table First table from the reports query
 * @param together2Table Second table from the reports query
 * @param together3Table Third table from the reports query
 * @param together4Table Fourth table from the reports query
 */
const TogetherTables = ({together1Table, together2Table, together3Table, together4Table}) => {
    return (
        <div className={styles.tableWrapper1}>
            <table className = {styles.tableStyle} id = "BYOTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with BYO </th>
                    </tr>
                </thead>
                <tbody>
                    {together1Table.map(item => {
                        return <Together1Item key={item.pizzatype} item={item} />
                    })
                    }
                </tbody>
            </table>            

            <p> {"\n"} </p>
            <table className = {styles.tableStyle} id = "CheeseTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with Cheese </th>
                    </tr>
                </thead>
                <tbody>
                    {together2Table.map(item => {
                        return <Together2Item key={item.pizzatype} item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <table className = {styles.tableStyle} id = "1TopTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with 1-Topping </th>
                    </tr>
                </thead>
                <tbody>
                    {together3Table.map(item => {
                        return <Together3Item key={item.pizzatype} item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <table className = {styles.tableStyle} id = "ComboTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with Combo </th>
                    </tr>
                </thead>
                <tbody>
                    {together4Table.map(item => {
                        return <Together4Item key={item.pizzatype} item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default TogetherTables;