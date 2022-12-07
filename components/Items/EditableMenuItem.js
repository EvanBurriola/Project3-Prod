import React from 'react';

/**
 * Creating what is able to be editable within the manager view tables
 *  
 * @author Jenna Jung
 */
const EditableMenuItem = ({item, editFormData, handleEditFormChange}) => {
    return (
        <tr>
            <td> {item.typeid} </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Type Name'
                    name="pizzatype"
                    value = {editFormData.pizzatype}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Type Price'
                    name="itemprice"
                    value = {editFormData.itemprice}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type = "submit"> Save </button>
            </td>
        </tr>
    )
}

export default EditableMenuItem