const InventoryDropDown = ({item}) => {
    return(
        <option value={item.ingredientname}> {item.ingredientname} </option>
    )
}

export default InventoryDropDown;