// Cart displays whatever items are currently in the cart
// receives the cart array, plus functions to remove an item or change its quantity
function Cart({ cartItems, onRemove, onUpdateQty }) {
  // derived value — calculated fresh each render, not stored as separate state
  // this avoids total going "out of sync" with the actual cart items
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  return (
    <div>
      <h2>Cart</h2>

      {/* if cart is empty, show a message instead of an empty list */}
      {cartItems.length === 0 && <p>Cart is empty</p>}

      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - Rs{item.price} x
            <input
              type="number"
              min="1"
              value={item.qty}
              // Number(...) converts the input's text value into an actual number
              onChange={(e) => onUpdateQty(item.id, Number(e.target.value))}
              style={{ width: "50px", margin: "0 8px" }}
            />
            <button onClick={() => onRemove(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <h3>Total: Rs{total}</h3>
    </div>
  );
}

export default Cart;