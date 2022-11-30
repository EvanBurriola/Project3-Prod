const Together1BarItem = ({item}) => {
    return (
        <infographic-bargroup name={item.pizzatype}>
            <infographic-bar value={item.ordered_with_byo}></infographic-bar>
        </infographic-bargroup>
    )
}

export default Together1BarItem;