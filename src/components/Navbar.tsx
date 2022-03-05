import { Link } from 'react-router-dom'

// styles
import './Navbar.scss'
import Searchbar from './SearchBar'

export default function Navbar() {
  return (
    <div className="navbar">
      <nav>
        <Link to="/" className="brand">
          <h1>CRUDdy Recipes</h1>
        </Link>
        <Searchbar />
        <Link to="/create">
          Add New Recipe
        </Link>
      </nav>
    </div>
  )
}
