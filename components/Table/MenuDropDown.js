const MenuDropDown = ({item}) => {
    return(
        <option value={item.pizzatype}> {item.pizzatype} </option>
    )
}

export default MenuDropDown;