/**
 * Creating the pizza items sales
 *  
 * @author Matthew Janczak
 * @param item item from the Sales Pizza table
 */
const SalesPizzaItem = ({item}) => {
    return(
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.numsales} </td>
            <td> {item.revenue} </td>
        </tr>
    )
}

export default SalesPizzaItem;