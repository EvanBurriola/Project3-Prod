/**
 * Creating what is sold together in the first table
 *  
 * @author Matthew Janczak
 * @param item item from the Together table
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