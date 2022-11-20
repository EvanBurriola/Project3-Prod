const Together4Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_combo} </td>
        </tr>
    )
}

export default Together4Item;