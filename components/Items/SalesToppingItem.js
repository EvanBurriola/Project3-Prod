const SalesToppingItem = ({item}) => {
    return(
        <tr>
            <td> {item.topping} </td>
            <td> {item.totalused} </td>
            <td> {item.numsales} </td>
        </tr>
    )
}

export default SalesToppingItem;