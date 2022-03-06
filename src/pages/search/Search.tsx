import { useLocation } from "react-router-dom";
import { IRecipe } from "../../ts/interfaces";
import useFetch from "../../hooks/useFetch";

import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";

import "./Search.scss";
const SEARCH_URL = `http://localhost:3000/recipes`;

export default function Search() {
  const queryString = useLocation().search
  const queryParams = new URLSearchParams(queryString)
  const query = queryParams.get('q') // coincidental that they are both "q"

  const url = SEARCH_URL + '?q=' + query;

  const { data, isPending, error } = useFetch<IRecipe[]>(url);

  return (
    <div className="search">
      <h2 className="page-title">Search Results</h2>
      {error && <div className="error">{error}</div>}
      {isPending && <LoaderAnimation />}
      {data && <>
        <h3>Found {data.length} result{data.length === 1 ? '' : `s`} for the search term "{query}"</h3>
        <RecipeList recipes={data} />
      </>}
    </div>
  )
}