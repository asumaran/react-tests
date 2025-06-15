// 🧠 3. Lista filtrable
// Objetivo: Uso de useState y Array.prototype.filter.
// Muestra una lista de nombres. Agrega un input para buscar por texto.

import { useState } from 'react';

const list = ['goku', 'vegeta', 'krillin', 'picoro', 'gohan'];

const FilteredList = () => {
  const [query, setQuery] = useState('');

  // Simple filtering - no memoization needed for small lists
  const filteredList = query.trim()
    ? list.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : list;

  return (
    <div>
      <input
        className="border p-2 mb-4"
        type="text"
        placeholder="Search characters..."
        value={query}
        onChange={(e) => setQuery(e.currentTarget.value)}
      />
      <ol>
        {filteredList.map((name) => (
          <li key={name}>{name}</li>
        ))}
      </ol>
    </div>
  );
};

export default FilteredList;
