/**
 * Creating what is sold together in the second table
 *  
 * @author ??
 */
const Together2Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_cheese} </td>
        </tr>
    )
}

export default Together2Item;