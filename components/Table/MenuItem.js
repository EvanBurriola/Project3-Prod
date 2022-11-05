

const MenuItem = ({item}) => {
    return (
        <tr>        
            <td> {item.typeid} </td>
            <td> {item.pizzatype} </td>
            <td> {item.itemprice} </td>
        </tr>
    )
}
export default MenuItem;