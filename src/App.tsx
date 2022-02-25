import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css'

import Navbar from './components/Navbar';

import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/Create';
import Search from './pages/search/Search';
import Whoops from './pages/whoops/Whoops';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
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
