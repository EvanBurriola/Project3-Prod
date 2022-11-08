
const RestockItem = ({item}) =>{
    if(item.quantityounces < item.minimumquantity){
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
    return
}

export default RestockItem;