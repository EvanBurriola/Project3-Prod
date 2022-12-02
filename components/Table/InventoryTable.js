import React from 'react';

// TODO: import data from database (Connect to the database)
import { useState, Fragment } from 'react';
import AccordionButton from 'node_modules/react-bootstrap/esm/AccordionButton';
import EditableItem from '../Items/EditableItem';
import { TableItem, EditableTableItem } from '../Items/TableItem';

import styles from '@/styles/manager.module.css'
//import { $CombinedState } from '../../../../../../AppData/Local/Microsoft/TypeScript/4.8/node_modules/redux/index';

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);
  
    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = (key) => {
        let direction = 'ascending';
        if (
            sortConfig &&
            sortConfig.key === key &&
            sortConfig.direction === 'ascending'
        ) {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };
    
    return { items: sortedItems, requestSort, sortConfig };
};

export const InventoryDisplay = ({inventory}) => {

    const { items, requestSort, sortConfig } = useSortableData(inventory);
    const getClassNamesFor = (name) => {
        if(!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    return (
        <div className={styles.tableWrapper}>
            <table className = {styles.tableStyle} id ="inventoryTable">
                <thead>
                    <tr>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('inventoryid')} 
                                className={getClassNamesFor('inventoryid')}
                            > 
                            Inventory ID 
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('ingredientname')} 
                                className={getClassNamesFor('ingredientname')}
                            > 
                            Item Name 
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('quantityounces')} 
                                className={getClassNamesFor('quantityounces')}
                            > 
                            Quantity
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('priceperounce')} 
                                className={getClassNamesFor('priceperounce')}
                            > 
                            Price ($)
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('averageamountperunitsold')} 
                                className={getClassNamesFor('averageamountperunitsold')}
                            > 
                            Amount User Per Sale
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('minimumquantity')} 
                                className={getClassNamesFor('minimumquantity')}
                            > 
                            Minimum Quantity Needed
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('itemtype')} 
                                className={getClassNamesFor('itemtype')}
                            > 
                            Item Type
                            </button> 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        return <TableItem key={item.inventoryid} item={item} />
                    }) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export const EditableInventory = ({inventory}) => {
    //Add Item
    // const [itemName, setItemName] = useState("");
    // const [quantity, setQuantity] = useState(0);
    // const [price, setPrice] = useState(0);
    // const [amountUsedPerSale, setAmountUsedPerSale] = useState(0);
    // const [minimumQuantityNeeded, setMinimumQuantityNeeded] = useState(0);
    // const [itemType, setItemType] = useState("");
    
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

    const handleAddFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute('name');
        const fieldValue = event.target.value;
        
        const newFormData = { ...addFormData};
        newFormData[fieldName] = fieldValue;
        
        setAddFormData(newFormData);
    };

    const handleAddFormSubmit = async(event) => {
        event.preventDefault();

        try{
            const body = {
                itemName: addFormData.ingredientname,
                quantity: Number(addFormData.quantityounces),
                price: Number(addFormData.priceperounce),
                amountUsedPerSale: Number(addFormData.averageamountperunitsold),
                minimumQuantityNeeded: Number(addFormData.minimumquantity),
                itemType: addFormData.itemtype,
            }
            const response = await fetch('/api/manager/addItem',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newItem = await response.json()
            setInventories([...inventories, newItem])
        }
        catch(error){
            console.error(error);
        }
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

        const fieldName = event.target.getAttribute("name"); //change?
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

        try{
            const body = {
                inventoryID: inventoryidd,
            }
            await fetch('api/manager/deleteItem',{
                method: "POST",
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
    }

    const { items, requestSort, sortConfig } = useSortableData(inventories);
    const getClassNamesFor = (name) => {
        if(!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    return (
        <div className={styles.tableWrapper}>
        <form onSubmit={handleEditFormSubmit}>
        <table className={styles.tableStyle} id="inventorytable">
            <thead>
                <tr>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('inventoryid')} 
                            className={getClassNamesFor('inventoryid')}
                        > 
                        Inventory ID 
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('ingredientname')} 
                            className={getClassNamesFor('ingredientname')}
                        > 
                        Item Name 
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('quantityounces')} 
                            className={getClassNamesFor('quantityounces')}
                        > 
                        Quantity
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('priceperounce')} 
                            className={getClassNamesFor('priceperounce')}
                        > 
                        Price ($)
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('averageamountperunitsold')} 
                            className={getClassNamesFor('averageamountperunitsold')}
                        > 
                        Amount User Per Sale
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('minimumquantity')} 
                            className={getClassNamesFor('minimumquantity')}
                        > 
                        Minimum Quantity Needed
                        </button> 
                    </th>
                    <th> 
                        <button 
                            type="button" 
                            onClick={() => requestSort('itemtype')} 
                            className={getClassNamesFor('itemtype')}
                        > 
                        Item Type
                        </button> 
                    </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <Fragment>
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
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type = "text"
                    name = "ingredientname"
                    required = "required"
                    placeholder = "Item Name"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "number"
                    name = "quantityounces"
                    placeholder = "Quantity"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "text"
                    name = "priceperounce"
                    required = "required"
                    placeholder = "Price"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "number"
                    name = "averageamountperunitsold"
                    required = "required"
                    placeholder = "Amount User Per Sale"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "number"
                    name = "minimumquantity"
                    required = "required"
                    placeholder = "Minimum Quantity Needed"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "text"
                    name = "itemtype"
                    required = "required"
                    placeholder = "Item Type"
                    onChange={handleAddFormChange}
                />
                <button className={styles.button} type = "submit"> Add </button>
            </form>

        </div>
    )
}