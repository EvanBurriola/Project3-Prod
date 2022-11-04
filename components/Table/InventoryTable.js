import React from 'react';

// TODO: import data from database (Connect to the database)

const InventoryTable = () => {

    return (
        <div>
            <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
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
            <p> {"\n"} </p>
            <h4> Add Inventory Item </h4>
            <form>
                <input
                    type = "text"
                    name = "inventoryID"
                    required = "required"
                    placeholder = "InventoryID"
                />
                <input
                    type = "text"
                    name = "itemName"
                    required = "required"
                    placeholder = "Item Name"
                />
                <input
                    type = "text"
                    name = "quantity"
                    placeholder = "Quantity"
                />
                <input
                    type = "text"
                    name = "price"
                    required = "required"
                    placeholder = "Price"
                />
                <button type = "submit"> Add </button>
            </form>
        </div>

    )
}

export default InventoryTable;