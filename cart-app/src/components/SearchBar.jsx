// SearchBar is a "controlled" component — it doesn't hold its own state,
// it just receives current value + a function to update it from the parent (App)

function searchBar({ search, setSearch }) {
    return (

        <input type="text"
                placeholder="Search products..."
                value={search}  // shows whatever value App is currently holding
                onChange={(e) => setSearch(e.target.value)} // tells App to update its state
        
        />
    );
}

export default searchBar;