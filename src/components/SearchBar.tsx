import { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './Searchbar.scss'

export default function Searchbar() {
  const [searchStr, setSearchStr] = useState('');
  const history = useHistory()

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cleanedString = searchStr.trim()
    if (cleanedString.length === 0) {
      return null;
    }
    history.push(`/search?q=${searchStr}`);  // ?q=Yada%20Yada
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
        <button type="submit" className="btn">
          <svg fill="none" id="magnifying-glass" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16l2.879-2.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242zM21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>
        </button>
      </form>
    </div>)
};