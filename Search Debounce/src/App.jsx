import { useState, useEffect } from "react";

function TypeAheadSearch() {

  const [query, setQuery] = useState("");    // current text in input
  const [results, setResults] = useState([]);  // books from API
  const [loading, setLoading] = useState(false);   // true while fetch is running
  const [error, setError] = useState(null);       // error msg if fetch fails

  useEffect(() => {
    // skip API call if input is empty or just spaces
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    setError(null);

    // debounce: start a 500ms timer every time query changes
    const timer = setTimeout(() => {
      fetch(`https://openlibrary.org/search.json?q=${query}`)
        .then((res) => res.json())    // step 1: parse response body into JS object
        .then((data) => {             // step 2: use the parsed data
          setResults(data.docs);      // Open Library nests results in "docs"
          setLoading(false);
        })
        .catch(() => {                         // runs only on network/parse failure
          setError("Failed to fetch results");
          setLoading(false);
        })
    }, 500);

    // cleanup: runs before next effect (i.e. before next keystroke's timer starts)
    // cancels the PREVIOUS timer so only the last keystroke's timer survives
    return () => clearTimeout(timer);
  }, [query]);    // re-run this whole effect every time query changes

  return (
    <div>
      <input
        type="text"
        placeholder="Search books"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <ul>
        {results.map((book) => (
          <li key={book.key}>
            {book.title} — {book.author_name ? book.author_name.join(", ") : "Unknown author"}
          </li>
        ))}
      </ul>
    </div>

  );

}
export default TypeAheadSearch;