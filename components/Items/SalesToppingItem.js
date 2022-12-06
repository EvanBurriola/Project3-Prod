/**
 * Creating the pizza toppings that are sold
 *  
 * @author Matthew Janczak
 * @param item item from the Sales Topping table
 */
const SalesToppingItem = ({item}) => {
    return(
        <tr>
            <td> {item.topping} </td>
            <td> {item.totalused} </td>
            <td> {item.numsales} </td>
        </tr>
    )
}

export default SalesToppingItem;