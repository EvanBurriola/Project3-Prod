import styles from '@/styles/manager.module.css'

import Together2Item from '../Items/Together2Item'

const Together2Table = ({together2Table}) => {
    return(
        <div>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with Cheese </th>
                    </tr>
                </thead>
                <tbody>
                    {together2Table.map(item => {
                        return <Together2Item item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Together2Table;