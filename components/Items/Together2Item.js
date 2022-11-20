const Together2Item = ({item}) => {
    return (
        <tr>
            <td> {item.pizzatype} </td>
            <td> {item.ordered_with_cheese} </td>
        </tr>
    )
}

export default Together2Item;