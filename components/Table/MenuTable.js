import React from 'react';
import { useState, Fragment } from 'react';

import EditableMenuItem from '../Items/EditableMenuItem';
import { MenuItem, EditableMenuTableItem} from '../Items/MenuItem';

import styles from '@/styles/manager.module.css';

export const MenuDisplay = ({menu}) => {
    return (
        <div className={styles.tableWrapper}>
            <table className = {styles.tableStyle} id ="menuTable">
                <thead>
                    <tr>
                        <th> Type ID </th>
                        <th> Type Name </th>
                        <th> Type Price </th>
                    </tr>
                </thead>
                <tbody>
                    {menu.map(item => {
                        return <MenuItem key={item.typeid} item={item} />
                    }) 
                    }
                </tbody>
            </table>
        </div>
    )
}

export const EditableMenu = ({menu}) => {
    const [menus, setMenus] = useState(menu);
    const [addFormData, setAddFormData] = useState({
        typeID: '',
        typeName: '',
        typePrice: '',
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
                newItemName: addFormData.typeName,
                newItemPrice: Number(addFormData.typePrice),
            }
            const response = await fetch('/api/manager/addMenuItem',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newItem = await response.json()
            setMenus([...menus, newItem])
        }
        catch(error){
            console.error(error);
        }
    }

    //
    const [editMenuID, setEditMenuID] = useState(null);
    const [editFormData, setEditFormData] = useState({
        typeid: '',
        typename: '',
        typeprice: '',
    })

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditMenuID(item.inventoryid);

        const formValues = {
            typeid: item.typeid,
            typename: item.typename,
            typeprice: item.typeprice,
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

        const editedMenu = {
            typeid: editFormData.typeid,
            typename: editFormData.typename,
            typeprice: editFormData.typeprice,
        }

        const newInv = [ ...menus]; //change?

        const index = menus.findIndex((item)=> item.typeid === editMenuID) //change?

        newInv[index] = editedMenu;

        setMenus(newInv);
        setEditInventoryID(null);
    }

    const handleDeleteClick = async(menuidd) => {
        const newInv = [...menus];

        const index = menus.findIndex((item) => item.typeid === menuidd);

        newInv.splice(index, 1);

        setMenus(newInv);

        try{
            const body = {
                id: menuidd,
            }
            await fetch('api/manager/deleteMenuItem',{
                method: "POST",
                body: JSON.stringify(body),
            });
        }
        catch(error){
            console.error(error);
        }
    }


    return (
        <div className={styles.tableWrapper}>
        <form onSubmit={handleEditFormSubmit}>
        <table className={styles.tableStyle} id="menutable">
            <thead>
                <tr>
                    <th> Pizza ID </th>
                    <th> Pizza Name </th>
                    <th> Pizza Price </th>
                </tr>
            </thead>
            <tbody>
                {menus.map((item) => (
                    <Fragment>
                        {editMenuID === item.typeid ? (
                            <EditableMenuItem 
                            editFormData = {editFormData}
                            handleEditFormChange = {handleEditFormChange}/>
                        ) :(
                            <EditableMenuTableItem 
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
        <h4> Add Menu Item </h4>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type = "text"
                    name = "typeName"
                    required = "required"
                    placeholder = "Pizza Name"
                    onChange={handleAddFormChange}
                />
                <input
                    type = "text"
                    name = "typePrice"
                    placeholder = "Pizza Price"
                    onChange={handleAddFormChange}
                />
                <button className={styles.button} type = "submit"> Add </button>
            </form>
        </div>
    )
}