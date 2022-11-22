import React from 'react';
import { useState } from 'react';

import MenuItem from '../Items/MenuItem';
import MenuDropDown from '../Dropdown/MenuDropDown';

import styles from '@/styles/manager.module.css'

const MenuTable = ({menu}) => {
    // change item
    const [menuItem, setMenuItem] = useState("");
    const [itemPrice, setItemPrice] = useState(0);
    // add item
    const [newItemName, setNewItem] = useState("");
    const [newItemPrice, setNewPrice] = useState("");
    // delete item
    const [itemDelete, setItemDelete] = useState(0.0);

    const changeMenu = async (event) => {
        event.preventDefault()
        try{
            const menuID = menu.find(item => item.pizzatype == menuItem).typeid;
            const body = {
                menuID,
                itemPrice
            }
            await fetch('/api/manager/changeMenu',{
                method: "PATCH",
                headers : { "Context-Type": "application/json"},
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
        console.log(menuItem, itemPrice)
    }

    const addMenuItem = async (event) => {
        console.log(newItemName, newItemPrice)
        event.preventDefault()
        try{
            const body = {
                newItemName,
                newItemPrice
            }
            await fetch('/api/manager/addMenuItem',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
    }

    const deleteItem = async (event) => {
        event.preventDefault()
        console.log(itemDelete)
        try{
            const id = menu.find(item => item.pizzatype == itemDelete).typeid;
            const body = {
                id,
            }
            await fetch('/api/manager/deleteMenuItem',{
                method: "POST",
                headers: { "Context-Type": "application/json" },
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
    }

    return(
        <div>
            <table className={styles.tableStyle} id ="menuTable">
                <thead>
                    <tr>
                        <th> Type ID </th>
                        <th> Pizza Type </th>
                        <th> Item Price </th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(item => {
                        return <MenuItem key={item.typeid} item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
            <h5 className = {styles.header}> Change Menu Item </h5>
            <form onSubmit={changeMenu}>
                <label for="menu item"> Select Menu Item to Change:</label>
                <select name="menuItem" id="menuItem" onChange={(event) => setMenuItem(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    {menu.map(item => {
                        return <MenuDropDown key={item.typeid} item={item} />
                    })
                    }
                </select>
                <input
                    type = "text"
                    name = "itemPrice"
                    required = "required"
                    placeholder = "New Price of Item"
                    onChange={(event) => setItemPrice(event.target.value)}
                />
                <button className = {styles.button1} type = "submit"> Set Price </button>
            </form>
            <p> {"\n"} </p>
            <form onSubmit={addMenuItem}>
                <label for="menu item"> Add Item to Menu: </label>
                <input
                    type = "text"
                    name = "itemName"
                    required = "required"
                    placeholder = "Name of new Item"
                    onChange={(event) => setNewItem(event.target.value)}
                />
                <input
                    type = "text"
                    name = "itemPrice"
                    required = "required"
                    placeholder = "Price of new Item"
                    onChange={(event) => setNewPrice(Number(event.target.value))}
                />
                <button type = "submit"> Add Item </button>
            </form>
            <h4> Delete Menu Item </h4>
            <form onSubmit={deleteItem}>
                <label for="inventory item"> Select Inventory Item to Delete: </label>
                <select name="inventoryItem" id="inventoryItem" onChange={(event) => setItemDelete(event.target.value)}>
                    <option value="" selected disabled hidden> Select Here </option>
                    {menu.map(item => {
                        return <MenuDropDown key={item.typeid} item={item} />
                    })
                    }
                </select>
                <button type = "submit"> Delete Item </button> 
            </form>
        </div>
    )
}

export default MenuTable;