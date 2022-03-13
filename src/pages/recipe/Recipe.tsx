import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { IRecipe } from "../../ts/interfaces";

import { projectFirestore } from "../../firebase/config";

import { handleError } from "../../ts/TS-ErrorHandler";
import { useTheme } from "../../hooks/useTheme";

import LoaderAnimation from "../../components/LoaderAnimation";

import "./Recipe.scss";

const Recipe = () => {

  const [recipe, setRecipe] = useState<null | IRecipe>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const history = useHistory(); // for changing URL on edit
  const { id } = useParams<{ id: string }>();
  const { mode } = useTheme();

  const handleClick = () => {
    history.push(`/edit/${id}`)
  }

  useEffect(() => {
    setIsPending(true);

    const cleanupFunction = projectFirestore.collection('recipes').doc(id).onSnapshot((doc) => {
      if (doc.exists) {
        setIsPending(false);
        const { method, title, ingredients, cookingTime } = doc.data() as IRecipe
        setRecipe({ id, method, title, ingredients, cookingTime })
      } else {
        setIsPending(false);
        setError(`Sorry, but there's a problem with Recipe ID:${id} in my Database!`)
      }
    },
      (err) => {
        setError(err)
        setIsPending(false);
      }
    )

    return () => cleanupFunction()

  }, [id]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{handleError(error)}</p>}
      {isPending && <LoaderAnimation />}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook.</p>
          <ul>
            <span>Ingredients:&#8194;</span>
            {recipe.ingredients.map(ing => <li key={ing}>{ing}</li>)}
          </ul>
          <p className="method">{recipe.method}</p>
          <div>
            <button onClick={handleClick}>Edit This Recipe</button>
          </div>
        </>
      )}
    </div>
  )
}

export default Recipe;