import { useState } from 'react';

const SelectorURI = () => {
  const [value, setValue] = useState('https://rickandmortyapi.com/graphql');

  function handleChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setValue(event.target.value);
  }

  return (
    <div>
      <select value={value} onChange={handleChange}>
        <option>https://rickandmortyapi.com/graphql</option>
        <option>https://spacex-production.up.railway.app/</option>
        <option>https://swapi-graphql.netlify.app/.netlify/functions/index</option>
        <option>https://countries.trevorblades.com/graphql</option>
      </select>
    </div>
  );
};

export default SelectorURI;
