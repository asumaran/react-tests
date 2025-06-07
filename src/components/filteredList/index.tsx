// 🧠 3. Lista filtrable
// Objetivo: Uso de useState y Array.prototype.filter.
// Muestra una lista de nombres. Agrega un input para buscar por texto.

import { useState } from 'react';

const list = ['goku', 'vegeta', 'krillin', 'picoro', 'gohan'];

const FilteredList = () => {
  const [filteredList, setFilteredList] = useState(list);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const query = e.currentTarget.value;
    if (query.trim()) {
      // NOTE: we should filter the original list
      // if we filter using filteredList it won't always work because it's already filtered.
      const filtered = list.filter((i) => i.includes(query));
      setFilteredList(filtered);
    } else {
      setFilteredList(list);
    }
  }

  return (
    <div>
      <input className="border" type="text" onChange={handleChange} />
      <ol>
        {filteredList.map((name, i) => (
          <li key={i}>{name}</li>
        ))}
      </ol>
    </div>
  );
};

export default FilteredList;
