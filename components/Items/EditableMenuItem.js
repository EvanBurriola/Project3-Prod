import React from 'react';

/**
 * Creating what is able to be editable within the manager view tables
 *  
 * @author ??
 */
const EditableMenuItem = ({editFormData, handleEditFormChange}) => {
    return (
        <tr>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Type ID'
                    name="typeid"
                    value = {editFormData.typeid}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Type Name'
                    name="typename"
                    value = {editFormData.typename}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Type Price'
                    name="typeprice"
                    value = {editFormData.typeprice}
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