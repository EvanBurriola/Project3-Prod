<<<<<<< HEAD
const RestockItem = ({item}) =>{
    return(
        <tr>        
=======

const RestockItem = ({item}) =>{
<<<<<<< HEAD
    if(item.quantityounces < item.minimumquantity){
        return(
            <tr>        
>>>>>>> Reorganized and started Reports
=======
    return(
        <tr>        
>>>>>>> Added delete for inventory and menu
            <td> {item.inventoryid} </td>
            <td> {item.ingredientname} </td>
            <td> {item.quantityounces} </td>
            <td> {item.priceperounce} </td>
            <td> {item.averageamountperunitsold} </td>
            <td> {item.minimumquantity} </td> 
            <td> {item.itemtype} </td>
        </tr>
<<<<<<< HEAD
<<<<<<< HEAD
    )
=======
        )
    }
    return
>>>>>>> Reorganized and started Reports
=======
    )
>>>>>>> Added delete for inventory and menu
}

export default RestockItem;