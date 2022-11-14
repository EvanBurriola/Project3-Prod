import React from 'react';

// TODO: import data from database (Connect to the database)
import { useState, Fragment } from 'react';
import InventoryDropDown from '../Dropdown/InventoryDropDown';
import AccordionButton from 'node_modules/react-bootstrap/esm/AccordionButton';
import EditableItem from '../Items/EditableItem';
import { TableItem, EditableTableItem } from '../Items/TableItem';

<<<<<<< HEAD
import styles from '@/styles/manager.module.css'
=======
import styles from '@/styles/manager.module.css';
>>>>>>> Manager dashboard layout completed

export const InventoryTable = ({inventory}) => {
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
    const [changeTo, setChangeTo] = useSgtate(0);
    // Delete Item
    const [itemDelete, setItemDelete] = useState("");

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
<<<<<<< HEAD
        // window.location.reload();
=======
        window.location.reload();
>>>>>>> Added reload for Add Item
    };

    const deleteItem = async (event) =>{
        event.preventDefault();
        
        try{
            const inventoryID = inventory.find(item => item.ingredientname == itemDelete).inventoryid;
            console.log(itemDelete, inventoryID);
            const body = {
                inventoryID
            }
            await fetch('api/manager/deleteItem',{
                method: "POST",
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
        window.location.reload();
    }

    return (
        <div className={styles.tableWrapper}>
            <table className = {styles.tableStyle} id ="inventoryTable">
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
            <p> {"\n"} </p>
            <h4> Delete Inventory Item </h4>
            <form onSubmit={deleteItem}>
                <label for="inventory item"> Select Inventory Item to Delete: </label>
                <select name="inventoryItem" id="inventoryItem" onChange={(event) => setItemDelete(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    {inventory.map(item => {
                        return <InventoryDropDown key={item.inventoryid} item={item} />
                    })
                    }
                </select>
                <button type = "submit"> Delete Item </button> 
            </form>
        </div>
    )
}

export const InventoryDisplay = ({inventory}) => {
    return (
        <div className={styles.tableWrapper}>
<<<<<<< HEAD
            <table className = {styles.tableStyle} id ="inventroyTable">
=======
            <table className = {styles.tableStyle} id ="excelDataTable">
>>>>>>> Manager dashboard layout completed
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
<<<<<<< HEAD
                <tbody>
=======
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
>>>>>>> Manager dashboard layout completed
                    {inventory.map(item => {
                        return <TableItem key={item.inventoryid} item={item} />
                    }) 
                    }
                    
                </tbody>
            </table>
        </div>
    )
<<<<<<< HEAD
}

export const EditableInventory = ({inventory}) => {
    //Add Item
    const [itemName, setItemName] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [price, setPrice] = useState(0);
    const [amountUsedPerSale, setAmountUsedPerSale] = useState(0);
    const [minimumQuantityNeeded, setMinimumQuantityNeeded] = useState(0);
    const [itemType, setItemType] = useState("");
    
    const [inventories, setInventories] = useState(inventory);
    const [addFormData, setAddFormData] = useState({
        inventoryid: '',
        ingredientname: '',
        quantityounces: '',
        priceperounce: '',
        averageamountperunitsold: '',
        minimumquantity: '',
        itemtype: ''
    });

    //Add Item
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
        // window.location.reload();
    };

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('inventoryid');
        const fieldValue = event.target.value;

        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;

        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = (event) => {
        event.preventDefault();

        const newInventory = {
            inventoryid: addFormData.inventoryid,
            ingredientname: addFormData.ingredientname,
            quantityounces: addFormData.quantityounces,
            priceperounce: addFormData.priceperounce,
            averageamountperunitsold: addFormData.averageamountperunitsold,
            minimumquantity: addFormData.minimumquantity,
            itemtype: addFormData.itemtype,
        };

        const newInventories = [...inventories, newInventory];
        setInventories(newInventories);
    }

    //
    const [editInventoryID, setEditInventoryID] = useState(null);
    const [editFormData, setEditFormData] = useState({
        inventoryid: '',
        ingredientname: '',
        quantityounces: '',
        priceperounce: '',
        averageamountperunitsold: '',
        minimumquantity: '',
        itemtype: '',
    })

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditInventoryID(item.inventoryid);

        const formValues = {
            inventoryid: item.inventoryid,
            ingredientname: item.ingredientname,
            quantityounces: item.quantityounces,
            priceperounce: item.priceperounce,
            averageamountperunitsold: item.averageamountperunitsold,
            minimumquantity: item.minimumquantity,
            itemtype: item.itemtype,
        }
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("inventoryid"); //change?
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = (event) => {
        event.preventDefault();

        const editedInventory = {
            inventoryid: editFormData.inventoryid,
            ingredientname: editFormData.ingredientname,
            quantityounces: editFormData.quantityounces,
            priceperounce: editFormData.priceperounce,
            averageamountperunitsold: editFormData.averageamountperunitsold,
            minimumquantity: editFormData.minimumquantity,
            itemtype: editFormData.itemtype,
        }

        const newInv = [ ...inventories]; //change?

        const index = inventories.findIndex((item)=> item.inventoryid === editInventoryID) //change?

        newInv[index] = editedInventory;

        setInventories(newInv);
        setEditInventoryID(null);
    }

    const handleDeleteClick = async(inventoryidd) => {
        const newInv = [...inventories];

        const index = inventories.findIndex((item) => item.inventoryid === inventoryidd);

        newInv.splice(index, 1);

        setInventories(newInv);
    }


    return (
        <div className={styles.tableWrapper}>
        <form onSubmit={handleEditFormSubmit}>
        <table className={styles.tableStyle}>
            <thead>
                <tr>
                    <th> Inventory ID </th>
                    <th> Item Name </th>
                    <th> Quantity </th>
                    <th> Price ($) </th>
                    <th> Amount Used Per Sale </th>
                    <th> Minimum Quantity Needed </th>
                    <th> Item Type </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {inventories.map((item) => (
<<<<<<< HEAD
                    <Fragment key={item.inventoryID}>
=======
                    <Fragment>
>>>>>>> design/editable table
                        {editInventoryID === item.inventoryid ? (
                            <EditableItem 
                            editFormData = {editFormData}
                            handleEditFormChange = {handleEditFormChange}/>
                        ) :(
                            <EditableTableItem 
                            item = {item} 
                            handleEditClick = {handleEditClick}
                            handleDeleteClick = { handleDeleteClick }
                            />
                        )}
                    </Fragment>
                ))}
            </tbody>
        </table>
        </form>
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
                <button className={styles.button} type = "submit"> Add </button>
            </form>

        </div>
    )
=======
>>>>>>> Manager dashboard layout completed
}