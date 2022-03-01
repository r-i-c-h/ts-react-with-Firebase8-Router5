import { IRecipe } from "../../ts/interfaces";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./Recipe.scss";
import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";

const Recipe = () => {
  const { id } = useParams<{ id: string }>();
  const url = 'http://localhost:3000/recipes/' + id
  const { data: recipe, isPending, error } = useFetch<IRecipe>(url);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <LoaderAnimation />}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>)
}

export default Recipe;