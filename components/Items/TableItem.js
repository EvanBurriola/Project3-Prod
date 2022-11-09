

<<<<<<< HEAD
export const TableItem = ({item}) =>{
=======
const TableItem = ({item}) =>{
>>>>>>> Reorganized and started Reports
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

<<<<<<< HEAD
export const EditableTableItem = ({item, handleEditClick, handleDeleteClick}) =>{
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
                    onClick = {(event) => handleEditClick(event, item)}
                > 
                    Edit 
                </button>
                <button
                    type = "button"
                    onClick = {()=> handleDeleteClick(item.inventoryid) }> Delete </button>
            </td>
        </tr>
    )
}
=======
export default TableItem;
>>>>>>> Reorganized and started Reports
