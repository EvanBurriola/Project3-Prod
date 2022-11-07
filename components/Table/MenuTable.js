import React from 'react';
import { useState } from 'react';

import MenuItem from './MenuItem';
import MenuDropDown from './MenuDropDown';

import styles from '@/styles/manager.module.css'

const MenuTable = ({menu}) => {
    const [menuItem, setMenuItem] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

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

    return(
        <div>
            <table className={styles.tableStyle} id ="excelDataTable">
                <thead>
                    <tr>
                        <th> Type ID </th>
                        <th> Pizza Type </th>
                        <th> Item Price </th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(item => {
                        return <MenuItem item={item} />
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
                        return <MenuDropDown item={item} />
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
        </div>
    )
}

export default MenuTable;