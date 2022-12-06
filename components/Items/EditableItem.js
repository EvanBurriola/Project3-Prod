import React from 'react';

const EditableItem = ({ editFormData, handleEditFormChange }) => {
    return (
        <tr>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Inventory '
                    name="inventoryid"
                    value = {editFormData.inventoryid}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Item Name'
                    name="ingredientname"
                    value = {editFormData.ingredientname}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Quantity'
                    name="quantityounces"
                    value = {editFormData.quantityounces}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Price ($)'
                    name="priceperounce"
                    value = {editFormData.priceperounce}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Amount Used Per Sale'
                    name="averageamountperunitsold"
                    value = {editFormData.averageamountperunitsold}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Minimum Quantity'
                    name="minimumquantity"
                    value = {editFormData.minimumquantity}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <input
                    type = "text"
                    required = "required"
                    placeholder='Item Type'
                    name="itemtype"
                    value = {editFormData.itemtype}
                    onChange = {handleEditFormChange}
                ></input>
            </td>
            <td>
                <button type = "submit"> Save </button>
            </td>
        </tr>

    )
}

export default EditableItem