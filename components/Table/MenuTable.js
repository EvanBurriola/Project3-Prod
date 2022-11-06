import React from 'react';
import { useState } from 'react';

import MenuItem from './MenuItem';
import MenuDropDown from './MenuDropDown';

const MenuTable = ({menu}) => {
    const [menuItem, setMenuItem] = useState("");
    const [itemPrice, setItemPrice] = useState(0);

    const changeMenu = (event) => {
        
        event.preventDefault()
        console.log(menuItem, itemPrice)
    }

    return(
        <div>
            <table style={{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}} id ="excelDataTable">
                <thead style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    <tr>
                        <th> Type ID </th>
                        <th> Pizza Type </th>
                        <th> Item Price </th>
                    </tr>
                </thead>
                <tbody style = {{"borderWidth":"1px", 'borderColor':"#aaaaaa", 'borderStyle':'solid'}}>
                    {menu.map(item => {
                        return <MenuItem item={item} />
                    })
                    }
                </tbody>
            </table>
            <p> {"\n"} </p>
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
                <button type = "submit"> Set Price </button>
            </form>
        </div>
    )
}

export default MenuTable;