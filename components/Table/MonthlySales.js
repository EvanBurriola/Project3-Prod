import React from 'react';

import styles from "@/styles/manager.module.css"

// TODO: import data from database (Connect to the database)

const MonthlySales = () => {

    return (
        <div>
            <h3> Monthly Sales </h3>
            <table className={styles.table}>
                <thead style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <th> Inventory ID </th>
                        <th> Item Name </th>
                        <th> Quantity </th>
                        <th> Price ($) </th>
                    </tr>
                </thead>
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <td> 1 </td>
                        <td> Dough </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 2 </td>
                        <td> Cheese </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 3 </td>
                        <td> Olives </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 4 </td>
                        <td> Pepperoni </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                    <tr>
                        <td> 5 </td>
                        <td> Salami </td>
                        <td> 1000 </td>
                        <td> 2.00 </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default MonthlySales;