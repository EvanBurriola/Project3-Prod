/**
 * Creating the excess items within the tables
 *  
 * @author Matthew Janczak
 * @param item item from the excess table
 */
const ExcessItem = ({item}) => {
    return(
        <tr>
            <td> {item.ingredientname} </td>
            <td> {item.totalused} </td>
            <td> {item.inventorynow} </td>
            <td> {item.percentused} </td>
        </tr>
    )
}

export default ExcessItem;