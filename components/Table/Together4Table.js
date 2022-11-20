import styles from '@/styles/manager.module.css'

import Together4Item from '../Items/Together2Item'

const Together4Table = ({together4Table}) => {
    return(
        <div>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with Combo </th>
                    </tr>
                </thead>
                <tbody>
                    {together4Table.map(item => {
                        return <Together4Item item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Together4Table;