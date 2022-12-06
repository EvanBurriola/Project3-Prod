/**
 * Creating what is sold together in the third table
 *  
 * @author Matthew Janczak
 * @param item item from the Together table
 */
const Together3Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_1_top} </td>
        </tr>
    )
}

export default Together3Item;