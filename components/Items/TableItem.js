/**
 * Creating what is within the invenotory table for the manager view
 *  
 * @author ??
 */
export const TableItem = ({item}) =>{
    return(
        <tr>        
            <td> {item.inventoryid} </td>
            <td> {item.ingredientname} </td>
            <td> {item.quantityounces} </td>
            <td> {item.priceperounce} </td>
            <td> {item.averageamountperunitsold} </td>
            <td> {item.minimumquantity} </td> 
            <td> {item.itemtype} </td>
        </tr>
    )
}

/**
 * Creating what is within the invenotory table for the manager view and making it editable
 *  
 * @author ??
 */
export const EditableTableItem = ({item, handleEditClick, handleDeleteClick}) => {
    return(
        <tr>
            <td> {item.inventoryid} </td>
            <td> {item.ingredientname} </td>
            <td> {item.quantityounces} </td>
            <td> {item.priceperounce} </td>
            <td> {item.averageamountperunitsold} </td>
            <td> {item.minimumquantity} </td> 
            <td> {item.itemtype} </td>
            <td>
                <button 
                    type = "button"
                    onClick={(event) => handleEditClick(event, item)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteClick(item.inventoryid)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}
