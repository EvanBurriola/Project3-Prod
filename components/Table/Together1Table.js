import styles from '@/styles/manager.module.css'

import Together1Item from '../Items/Together1Item'

const Together1Table = ({together1Table}) => {
    return (
        <div>
            <table className = {styles.tableStyle} id = "excelDateTable">
                <thead>
                    <tr>
                        <th> Pizza Type </th>
                        <th> Ordered with BYO </th>
                    </tr>
                </thead>
                <tbody>
                    {together1Table.map(item => {
                        return <Together1Item item={item} />
                    })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Together1Table;