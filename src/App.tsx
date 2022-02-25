import { BrowserRouter, Switch, Route } from 'react-router-dom';

import './App.css'

import Home from './pages/home/Home';
import Recipe from './pages/recipe/Recipe';
import Create from './pages/create/create';
import Search from './pages/search/search';

function App() {

  return (
    <div className="App">
      <BrowserRouter>
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
        </Switch>
      </BrowserRouter>
    </div>)
}

export default App
