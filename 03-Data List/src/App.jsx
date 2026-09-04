import products from "./products";
import { useState } from "react";
import "./App.css";

function App() {
  // search = current text typed in the input box, starts empty
  const [search, setSearch] = useState("");

  // filter runs on every render, using current 'search' value
  const filtered = products.filter((item) =>
    // convert both to lowercase so search isn't case-sensitive
    // "includes" checks if search text is found anywhere inside the name
    item.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Products</h1>

      <input
        type="text"
        placeholder="search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <ul>
        {/* loop through the products array, one <li> per item */}
        {filtered.map((item) => (
          // key={item.id} — required by React to track each list item uniquely
          <li key={item.id}>
            {/* show this product's name and price */}
            {item.name} - Rs{item.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;