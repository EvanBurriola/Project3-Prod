/**
 * Creating what is sold together in the third table
 *  
 * @author ??
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