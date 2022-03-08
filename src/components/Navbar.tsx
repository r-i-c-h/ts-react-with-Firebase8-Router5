import { Link } from 'react-router-dom'
import { useTheme } from '../hooks/useTheme'

// styles
import './Navbar.scss'
import Searchbar from './SearchBar'

export default function Navbar() {
  const { color } = useTheme()

  return (
    <div className="navbar" style={{ backgroundColor: color }}>
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
