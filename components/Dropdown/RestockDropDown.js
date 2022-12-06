
/**
 * Creating the dropdown menu for the restock report
 * 
 * @author Matthew Janczak
 * @param item item from the restock table
 */
const RestockDropDown = ({item}) => {
    if(item.quantityounces < item.minimumquantity){
        return(
            <option value={item.ingredientname}> {item.ingredientname} </option>
        )
    }
    return
}

export default RestockDropDown;