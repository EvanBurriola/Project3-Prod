const RestockDropDown = ({item}) => {
    if(item.quantityounces < item.minimumquantity){
        return(
            <option value={item.ingredientname}> {item.ingredientname} </option>
        )
    }
    return
}

export default RestockDropDown;