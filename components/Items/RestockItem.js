<<<<<<< HEAD
const RestockItem = ({item}) =>{
    return(
        <tr>        
=======

const RestockItem = ({item}) =>{
    if(item.quantityounces < item.minimumquantity){
        return(
            <tr>        
>>>>>>> Reorganized and started Reports
            <td> {item.inventoryid} </td>
            <td> {item.ingredientname} </td>
            <td> {item.quantityounces} </td>
            <td> {item.priceperounce} </td>
            <td> {item.averageamountperunitsold} </td>
            <td> {item.minimumquantity} </td> 
            <td> {item.itemtype} </td>
        </tr>
<<<<<<< HEAD
    )
=======
        )
    }
    return
>>>>>>> Reorganized and started Reports
}

export default RestockItem;