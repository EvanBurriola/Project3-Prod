import React from 'react';

// TODO: import data from database (Connect to the database)
import TableItem from './TableItem';
import { useState } from 'react';
// import { roundToNearestMinutes } from 'date-fns';
import { Router } from 'node_modules/next/router';
import InventoryDropDown from './InventoryDropDown';
import AccordionButton from 'node_modules/react-bootstrap/esm/AccordionButton';

const InventoryTable = ({inventory}) => {
    //Add Item
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [amountUsedPerSale, setAmountUsedPerSale] = useState(0);
    const [minimumQuantityNeeded, setMinimumQuantityNeeded] = useState(0);
    const [itemType, setItemType] = useState("");
    // Change Item
    const [itemChange, setItemChange] = useState("");
    const [infoChange, setInfoChange] = useState("");
    const [changeTo, setChangeTo] = useState("");

    const changeItem = (event) => {
        event.preventDefault()
        console.log(itemChange, infoChange, changeTo)
    }

    const addItem = (event) => {
        event.preventDefault()
        console.log(itemName, quantity, price, amountUsedPerSale, minimumQuantityNeeded, itemType)
        //submitAddItem()
    }

    const submitAddItem = async () =>{
        //e.preventDefault();
        try{
            await fetch('../../pages/api/manager',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(itemName, quantity, price, amountUsedPerSale, minimumQuantityNeeded, itemType),
            });
            await Router.push('../../pages/manager');
        }
        catch(error){
            console.error(error);
        }
    };

    return (
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
                        return <TableItem item={item} />
                    }) 
                    }
                    
                </tbody>
            </table>
            <p> {"\n"} </p>
            <h5> Change Item in Inventory </h5>
            <form onSubmit={changeItem}>
                <label for="inventory item"> Select Inventory Item to Change: </label>
                <select name="inventoryItem" id="inventoryItem" onChange={(event) => setItemChange(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    {inventory.map(item => {
                        return <InventoryDropDown item={item} />
                    })
                    }
                </select>
                <label for="inventory info"> Select Thing to Change for Item: </label>
                <select name="inventoryInfo" id="inventoryInfo" onChange={(event) => setInfoChange(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    <option value="quantityounces"> Quantity </option>
                    <option value="priceperounce"> Price </option>
                    <option value="averageamountperunitsold"> Amount Used Per Sale </option>
                    <option value="minimumquantity"> Minimum Quantity Needed </option>
                    <option value="itemtype"> Item Type </option>
                </select>
                <input
                    type ="text"
                    name = "itemChnage"
                    required = "required"
                    placeholde = "Change To Here"
                    onChange={(event) => setChangeTo(event.target.value)}
                />
                <button type = "submit"> Change Item </button> 
            </form>
            <p> {"\n"} </p>
            <h4> Add Inventory Item </h4>
            <form onSubmit={addItem}>
                <input
                    type = "text"
                    name = "itemName"
                    required = "required"
                    placeholder = "Item Name"
                    onChange={(event) => setItemName(event.target.value)}
                />
                <input
                    type = "text"
                    name = "quantity"
                    placeholder = "Quantity"
                    onChange={(event) => setQuantity(event.target.value)}
                />
                <input
                    type = "text"
                    name = "price"
                    required = "required"
                    placeholder = "Price"
                    onChange={(event) => setPrice(event.target.value)}
                />
                <input
                    type = "text"
                    name = "amountusedpersale"
                    required = "required"
                    placeholder = "Amount User Per Sale"
                    onChange={(event) => setAmountUsedPerSale(event.target.value)}
                />
                <input
                    type = "text"
                    name = "minimumquantityneeded"
                    required = "required"
                    placeholder = "Minimum Quantity Needed"
                    onChange={(event) => setMinimumQuantityNeeded(event.target.value)}
                />
                <input
                    type = "text"
                    name = "itemtype"
                    required = "required"
                    placeholder = "Item Type"
                    onChange={(event) => setItemType(event.target.value)}
                />
                <button type = "submit"> Add </button>
            </form>
        </div>
    )
}

export default InventoryTable;