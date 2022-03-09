import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css'

import Navbar from './components/Navbar';
import ThemeSelector from './components/ThemeSelector';

import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Whoops from './pages/whoops/Whoops';
import { useTheme } from './hooks/useTheme';


function App() {
  const { mode } = useTheme();
  return (
    <div className={`App ${mode}`}>
      <BrowserRouter>
        <Navbar />
        <ThemeSelector />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/recipes/:id">
            <Recipe />
          </Route>
          <Route path="/search">
            <Search />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
          <Route path="*">
            <Whoops />
          </Route>
        </Switch>
      </BrowserRouter>
    </div>)
}

export default App
