import { IRecipe } from "../../ts/interfaces";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./Recipe.scss";
import LoaderAnimation from "../../components/LoaderAnimation";
import { useTheme } from "../../hooks/useTheme";

const Recipe = () => {
  const { mode } = useTheme();
  const history = useHistory(); // For URL change after delete

  const { id } = useParams<{ id: string }>();
  const url = 'http://localhost:3000/recipes/' + id
  const { data: recipe, isPending, error } = useFetch<IRecipe>(url);

  const handleDelete = async () => {
    await window.fetch(url, { method: "DELETE" });
    history.push('/');
  }

  return (
    <div className={`recipe ${mode}`}>
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
          <button onClick={handleDelete}>Delete Recipe</button>
        </>
      )}
    </div>)
}

export default Recipe;