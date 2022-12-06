/**
 * Creating what is sold together in the second table
 *  
 * @author Matthew Janczak
 * @param item item from the Together table
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