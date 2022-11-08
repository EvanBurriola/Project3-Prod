import React from 'react';

// TODO: import data from database (Connect to the database)
import TableItem from './TableItem';
import { useState } from 'react';
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
    const [changeTo, setChangeTo] = useState(0);

    const changeItem = async (event) => {
        event.preventDefault()
        try{
            const inventoryID = inventory.find(item => item.ingredientname == itemChange).inventoryid;
            const body = {
                inventoryID,
                infoChange,
                changeTo
            }
            await fetch('/api/manager/changeItem',{
                method: "POST",
                headers: { "Context-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
        console.log(itemChange, infoChange, changeTo)
    }

    const addItem = async (event) =>{
        event.preventDefault();
        try{
            const body = {
                itemName,
                quantity,
                price,
                amountUsedPerSale,
                minimumQuantityNeeded,
                itemType
            }
            await fetch('/api/manager/addItem',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
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
                        return <TableItem key={item.inventoryid} item={item} />
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
                        return <InventoryDropDown key={item.inventoryid} item={item} />
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
                    name = "itemChange"
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
                    type = "number"
                    name = "quantity"
                    placeholder = "Quantity"
                    onChange={(event) => setQuantity(Number(event.target.value))}
                />
                <input
                    type = "number"
                    name = "price"
                    required = "required"
                    placeholder = "Price"
                    onChange={(event) => setPrice(Number(event.target.value))}
                />
                <input
                    type = "number"
                    name = "amountusedpersale"
                    required = "required"
                    placeholder = "Amount User Per Sale"
                    onChange={(event) => setAmountUsedPerSale(Number(event.target.value))}
                />
                <input
                    type = "number"
                    name = "minimumquantityneeded"
                    required = "required"
                    placeholder = "Minimum Quantity Needed"
                    onChange={(event) => setMinimumQuantityNeeded(Number(event.target.value))}
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