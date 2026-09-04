// ProductList just displays products — it doesn't own any state itself
// it receives the list to show, and a function to call when "Add to Cart" is clicke

function ProductList({products, onAddToCart}) {

    return(
        <ul>
            {
                products.map((item) =>
                <li key={item.id}>
                    {item.name} - Rs{item.price}
                     {/* clicking this tells the parent (App) to add this specific item */}
                     <button onClick={() => onAddToCart(item)}>Add to cart</button>
                </li>
                
                )
            }
        </ul>
    );
}
export default ProductList;