import { IRecipe } from "../../ts/interfaces";

import useFetch from "../../hooks/useFetch";

import "./Home.scss";

import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";



export default function Home() {
  const { data, isPending, error } = useFetch<IRecipe[]>('http://localhost:3000/recipes')
  return (
    <div className="home">
      <h1 className="page-title">Home</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <LoaderAnimation />}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}