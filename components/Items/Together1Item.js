const Together1Item = ({item}) => {
    return (
        <tr style={item.ordered_with_byo}>
            <td scope="row"> {item.pizzatype} </td>
            <td> {item.ordered_with_byo} </td>
        </tr>
    )
}

export default Together1Item;