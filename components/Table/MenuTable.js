import React from 'react';
import { useState, Fragment } from 'react';

import EditableMenuItem from '../Items/EditableMenuItem';
import { MenuItem, EditableMenuTableItem} from '../Items/MenuItem';

import styles from '@/styles/manager.module.css';

/**
 * Creating a way to sort a table in the manager view
 *  
 * @author Matthew Janczak
 * @param items Table of sorted items
 */
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

/**
 * Creating a display for the menu table in the manager view
 *  
 * @author Matthew Janczak
 */
export const MenuDisplay = ({menu}) => {

    const { items, requestSort, sortConfig } = useSortableData(menu);
    const getClassNamesFor = (name) => {
        if(!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    return (
        <div>
            <table className = {styles.tableStyle} id ="menuTable">
                <thead>
                    <tr>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('typeid')} 
                                className={getClassNamesFor('typeid')}
                            > 
                            Type ID 
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('pizzatype')} 
                                className={getClassNamesFor('pizzatype')}
                            > 
                            Type Name 
                            </button> 
                        </th>
                        <th> 
                            <button 
                                type="button" 
                                onClick={() => requestSort('itemprice')} 
                                className={getClassNamesFor('itemprice')}
                            > 
                            Type Price 
                            </button> 
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => {
                        return <MenuItem key={item.typeid} item={item} />
                    }) 
                    }
                </tbody>
            </table>
        </div>
    )
}
/**
 * Creating a way to edit the menu table in the manager view
 *  
 * @author Jenna Jung
 * @author Matthew Janczak
 * @param menu Table from the database
 */
export const EditableMenu = ({menu}) => {
    const [menus, setMenus] = useState(menu);
    const [addFormData, setAddFormData] = useState({
        typeid: '',
        pizzatype: '',
        itemprice: '',
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
                newItemName: addFormData.pizzatype,
                newItemPrice: Number(addFormData.itemprice),
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

    const [editMenuID, setEditMenuID] = useState(null);
    const [editFormData, setEditFormData] = useState({
        typeid: '',
        pizzatype: '',
        itemprice: '',
    })

    const handleEditClick = (event, item) => {
        event.preventDefault();
        setEditMenuID(item.typeid);

        const formValues = {
            typeid: item.typeid,
            pizzatype: item.pizzatype,
            itemprice: item.itemprice,
        }

        setEditFormData(formValues);
    }

    const handleEditFormChange = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...editFormData };
        newFormData[fieldName] = fieldValue;

        setEditFormData(newFormData);
    }

    const handleEditFormSubmit = async(event) => {
        event.preventDefault();
        try {
            const body = {
                typeid: editFormData.typeid,
                pizzatype: editFormData.pizzatype,
                itemprice: editFormData.itemprice,
            }
            await fetch('/api/manager/changeMenu',{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body),
            });
            const newInv = [ ...menus];

            const index = menus.findIndex((item)=> item.typeid === editMenuID) //change?

            newInv[index] = body;

            setMenus(newInv);
            setEditMenuID(null);
        }
        catch(error){
            console.error(error);
        }
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

    const { items, requestSort, sortConfig } = useSortableData(menus);
    const getClassNamesFor = (name) => {
        if(!sortConfig){
            return;
        }
        return sortConfig.key === name ? sortConfig.direction : undefined;
    }

    return (
        <div>
        <div className={styles.tableWrapper2}>
        <form onSubmit={handleEditFormSubmit}>
        <table className={styles.tableStyle2} id="menutable">
            <thead>
                <tr>
                <th> 
                    <button 
                        type="button" 
                        onClick={() => requestSort('typeid')} 
                        className={getClassNamesFor('typeid')}
                    > 
                    Type ID 
                    </button> 
                </th>
                <th> 
                    <button 
                        type="button" 
                        onClick={() => requestSort('pizzatype')} 
                        className={getClassNamesFor('pizzatype')}
                    > 
                    Type Name 
                    </button> 
                </th>
                <th> 
                    <button 
                        type="button" 
                        onClick={() => requestSort('itemprice')} 
                        className={getClassNamesFor('itemprice')}
                    > 
                    Type Price 
                    </button> 
                </th>
                    <th> Actions </th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <Fragment key={item.typeid}>
                        {editMenuID === item.typeid ? (
                            <EditableMenuItem 
                            item = {item}
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
        </div>
        <p> </p>
        <div>
        <h4> Add Menu Item </h4>
            <form onSubmit={handleAddFormSubmit}>
                <input
                    type = "text"
                    name = "pizzatype"
                    required = "required"
                    placeholder = "Pizza Name"
                    onChange={handleAddFormChange}
                    className = {styles.textEntryStyle}
                />
                <input
                    type = "text"
                    name = "itemprice"
                    placeholder = "Pizza Price"
                    onChange={handleAddFormChange}
                    className = {styles.textEntryStyle}
                />
                <button className={styles.button} type = "submit"> Add </button>
            </form>
            </div>
        </div>
    )
}