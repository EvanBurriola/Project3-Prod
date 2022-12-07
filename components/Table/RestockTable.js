import React from 'react';
import RestockItem from '../Items/RestockItem';
import RestockDropDown from '../Dropdown/RestockDropDown';
import { useState } from 'react';

import styles from '@/styles/manager.module.css'

/**
 * Creating a display for the restock table in the manager view
 *  
 * @author Matthew Janczak
 * @param restockTable Table from the reports query
 */
const RestockTable = ({restockTable}) => {
    const [restockTables, setTables] = useState(restockTable);
    const [restockFormData, setRestockFormData] = useState({
        itemname: '',
        quantityRestock: '',
    });

    const handleRestockFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;

        const newFormData = { ...restockFormData};
        newFormData[fieldName] = fieldValue;

        setRestockFormData(newFormData);
    }

    // const [itemName, setRestockItem] = useState("");
    // const [quantityRestock, setQuantityRestock] = useState(0);

    const handleRestockFormSubmit = async (event) => {
        event.preventDefault()

        const itemID = restockTable.find(item => item.ingredientname == restockFormData.itemname).inventoryid

        const newTable = [...restockTables]

        const index = restockTables.findIndex((item) => item.inventoryid === itemID);

        //console.log(index);

        newTable.splice(index, 1);
        setTables(newTable);

        try{
            const curQuantity = restockTable.find(item => item.ingredientname == restockFormData.itemname).quantityounces
            const body = {
                itemID,
                curQuantity,
                quantityRestock: Number(restockFormData.quantityRestock),
            }
            const response = await fetch('/api/manager/restockItem',{
                method: "PATCH",
                headers: { "Context-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newItem = await response.json()
            window.location.reload()
        }
        catch(error){
            console.error(error);
        }
    }

    return(
        <div className={styles.tableWrapper1}>
            <table className = {styles.tableStyle} id ="restockTable">
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
                    {restockTable.map(item => {
                        return <RestockItem key={item.inventoryid} item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <div className={styles.leftMargin}>
            <h5 className = {styles.header}> Restock Item</h5>
                <form onSubmit={handleRestockFormSubmit}>
                    <label className={styles.header} for="restock item"> Select Item to Restock: </label>
                    <select name="itemname" id="restockitem" onChange={handleRestockFormChange}>
                        <option value="" selected disabled hidden> Select Here </option>
                        {restockTable.map(item => {
                            return <RestockDropDown key={item.inventoryid} item={item} />
                        })
                        }
                    </select>
                    <input
                        type = "text"
                        name = "quantityRestock"
                        required = "required"
                        placeholder = "Amount of Restock"
                        onChange={handleRestockFormChange}
                    />
                    <button className = {styles.button} type = "submit"> Restock Item </button>
                </form>
            </div>
        </div>
    )
}

export default RestockTable;