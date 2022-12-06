
/**
 * Creating the menu items within the table
 *  
 * @author ??
 */
export const MenuItem = ({item}) => {
    return (
        <tr>        
            <td> {item.typeid} </td>
            <td> {item.pizzatype} </td>
            <td> {item.itemprice} </td>
        </tr>
    )
}

/**
 * Creating the editable menu items within the table
 *  
 * @author ??
 */
export const EditableMenuTableItem = ({item, handleEditClick, handleDeleteClick}) => {
    return(
        <tr>
            <td> {item.typeid} </td>
            <td> {item.pizzatype} </td>
            <td> {item.itemprice} </td>
            <td>
                <button 
                    type = "button"
                    onClick={(event) => handleEditClick(event, item)}
                >
                    Edit
                </button>
                <button
                    type="button"
                    onClick={() => handleDeleteClick(item.typeid)}
                >
                    Delete
                </button>
            </td>
        </tr>
    )
}