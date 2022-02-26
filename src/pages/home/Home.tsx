import { IRecipe } from "../../ts/interfaces";

import useFetch from "../../hooks/useFetch";

import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeCard from "../../components/RecipeCard";

import "./Home.scss";


const Home = () => {
  const { data, isPending, error } = useFetch<IRecipe[]>('http://localhost:3000/recipes')

  return (
    <div className="home">
      <h1 className="page-title">Home</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <LoaderAnimation />}


      {data &&
        <div className="results">{data.map(
          (eachRecipe: IRecipe) => {
            return (
              <RecipeCard key={eachRecipe.id} {...eachRecipe} />
            )
          }
        )}
        </div>}

    </div>
  )
}

export default Home;