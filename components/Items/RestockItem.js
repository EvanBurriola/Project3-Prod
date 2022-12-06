/**
 * Creating the items that can be restocked
 *  
 * @author ??
 */
const RestockItem = ({item}) =>{  
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

export default RestockItem;