import React from 'react';
import RestockItem from './RestockItem';
import RestockDropDown from './RestockDropDown';
import { useState } from 'react';

import styles from '@/styles/manager.module.css'


const RestockTable = ({inventory}) => {
    const [itemName, setRestockItem] = useState("");
    const [quantityRestock, setQuantityRestock] = useState(0);

    const restockItem = async (event) => {
        event.preventDefault()
        try{
            const itemID = inventory.find(item => item.ingredientname == itemName).inventoryid
            const curQuantity = inventory.find(item => item.ingredientname == itemName).quantityounces
            const body = {
                itemID,
                curQuantity,
                quantityRestock
            }
            await fetch('/api/manager/restockItem',{
                method: "PATCH",
                headers: { "Context-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
        console.log(itemName, quantityRestock)
    }

    return(
        <div>
            <table className = {styles.tableStyle} id ="excelDataTable">
                <thead>
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
                <tbody>
                    {inventory.map(item => {
                        return <RestockItem key={item.inventoryid} item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <div className={styles.leftMargin}>
            <h5 className = {styles.header}> Restock Item</h5>
                <form onSubmit={restockItem}>
                    <label for="restock item"> Select Item to Restock: </label>
                    <select name="restockitem" id="restockitem" onChange={(event) => setRestockItem(event.target.value)}>
                        <option value="" selected disabled hidden> Select Here </option>
                        {inventory.map(item => {
                            return <RestockDropDown key={item.inventoryid} item={item} />
                        })
                        }
                    </select>
                    <input
                        type = "text"
                        name = "quantityAmount"
                        required = "required"
                        placeholder = "Amount of Restock"
                        onChange={(event) => setQuantityRestock(event.target.value)}
                    />
                    <button className = {styles.button1} type = "submit"> Restock Item </button>
                </form>
            </div>
        </div>
    )
}

export default RestockTable;