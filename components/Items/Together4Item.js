/**
 * Creating what is sold together in the fourth table
 *  
 * @author Matthew Janczak
 * @param item item from the Together table
 */
const Together4Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_combo} </td>
        </tr>
    )
}

export default Together4Item;