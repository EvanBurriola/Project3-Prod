/**
 * Creating what is sold together in the first table
 *  
 * @author ??
 */
const Together1Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_byo} </td>
        </tr>
    )
}

export default Together1Item;