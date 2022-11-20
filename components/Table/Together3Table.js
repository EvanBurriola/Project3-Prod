import styles from '@/styles/manager.module.css'

import Together3Item from '../Items/Together2Item'

const Together3Table = ({together3Table}) => {
    return(
        <div>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with 1-Topping </th>
                    </tr>
                </thead>
                <tbody>
                    {together3Table.map(item => {
                        return <Together3Item item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Together3Table;