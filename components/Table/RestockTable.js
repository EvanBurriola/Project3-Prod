import React from 'react';
import RestockItem from './RestockItem';
import RestockDropDown from './RestockDropDown';
import { useState } from 'react';


const RestockTable = ({inventory}) => {
    const [itemName, setRestockItem] = useState("");
    const [quantityRestock, setQuantityRestock] = useState(0);

    const restockItem = (event) => {
        event.preventDefault()
        console.log(itemName, quantityRestock)
    }

    return(
        <div>
            <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} id ="excelDataTable">
                <thead style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <th> Inventory ID </th>
                        <th> Item Name </th>
                        <th> Quantity </th>
                        <th> Price ($) </th>
                        <th> Amount Used Per Sale </th>
                        <th> Minimum Quantity Needed </th>
                        <th> Item Type </th>
                    </tr>
                </thead>
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    {inventory.map(item => {
                        return <RestockItem item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <h5> Restock Item</h5>
            <form onSubmit={restockItem}>
                <label for="restock item"> Select Item to Restock: </label>
                <select name="restockitem" id="restockitem" onChange={(event) => setRestockItem(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    {inventory.map(item => {
                        return <RestockDropDown item={item} />
                    })
                    }
                    <script>
                        setRestockItem
                    </script>
                </select>
                <input
                    type = "text"
                    name = "quantityAmount"
                    required = "required"
                    placeholder = "Amount of Restock"
                    onChange={(event) => setQuantityRestock(event.target.value)}
                />
                <button type = "submit"> Restock Item </button>
            </form>
        </div>
    )
}

export default RestockTable;