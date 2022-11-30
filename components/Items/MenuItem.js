

const MenuItem = ({item}) => {
    return (
        <tr>        
            <td> {item.typeid} </td>
            <td> {item.pizzatype} </td>
            <td> {item.itemprice} </td>
        </tr>
    )
}
export default MenuItem;

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