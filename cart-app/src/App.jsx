import "./App.css";
import { useState } from "react";
import products from "./data/products";
import SearchBar from "./components/SearchBar";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  // search text, starts empty
  const [search, setSearch] = useState("");

  // cart holds items the user added — each item is a product PLUS a qty field
  const [cartItems, setCartItems] = useState([]);

  // filter product list based on search text (case-insensitive)
  const filteredProducts = products.filter((item) =>
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  // called when "Add to Cart" is clicked on a product
  function handleAddToCart(product) {
    // check if this product is already in the cart
    const existing = cartItems.find((item) => item.id === product.id);

    if (existing) {
      // already in cart — just increase its quantity by 1
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      );
    } else {
      // not in cart yet — add it with qty 1
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  }

  // called when qty input changes in Cart
  function handleUpdateQty(id, qty) {
    setCartItems(
      cartItems.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  }

  // called when Remove is clicked in Cart
  function handleRemove(id) {
    setCartItems(cartItems.filter((item) => item.id !== id));
  }

  return (
    <div className="App">
      <h1>Products</h1>

      <SearchBar search={search} setSearch={setSearch} />

      <ProductList products={filteredProducts} onAddToCart={handleAddToCart} />

      <Cart
        cartItems={cartItems}
        onRemove={handleRemove}
        onUpdateQty={handleUpdateQty}
      />
    </div>
  );
}

export default App;