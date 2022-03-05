import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Searchbar.scss'

export default function Searchbar() {
  const [searchStr, setSearchStr] = useState('');
  const history = useHistory()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    history.push(`/search?q=${searchStr}`);  // ?q= queryString
  }

  // 🔍 🔎
  return (
    <div className="searchbar">
      <form onSubmit={handleSubmit}>
        <label htmlFor="search">Search:</label>
        <input type="text"
          name="search"
          id="search"
          onChange={e => setSearchStr(e.target.value)}
          required
        />
      </form>
    </div>)
};