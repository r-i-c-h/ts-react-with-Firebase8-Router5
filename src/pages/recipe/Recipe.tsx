import { useState, useEffect } from "react";
import { IRecipe } from "../../ts/interfaces";

import { useHistory, useParams } from "react-router-dom";

import { projectFirestore } from "../../firebase/config";

import { handleError } from "../../ts/TS-ErrorHandler";
import { useTheme } from "../../hooks/useTheme";

import LoaderAnimation from "../../components/LoaderAnimation";

import "./Recipe.scss";


const Recipe = () => {
  const { mode } = useTheme();
  // const history = useHistory(); // For URL change after delete

  // useState<QueryDocumentSnapshot<DocumentData>[]>([])
  const [recipe, setRecipe] = useState<null | IRecipe>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);

  const { id } = useParams<{ id: string }>();

  //! TODO: Put back a handler for DELETING recipes
  /* const handleDelete = async () => {
    await window.fetch(url, { method: "DELETE" });
    history.push('/');
  } */

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection('recipes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false)
          const { method, title, ingredients, cookingTime } = doc.data() as IRecipe
          setRecipe({ id, method, title, ingredients, cookingTime })
        } else {
          setError(`Sorry, but there's a problem with Recipe ID:${id} in my Database!`)
        }
        setIsPending(false)
      })
      .catch(err => {
        setIsPending(false);
        setError(err);
      })
  }, []);

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
          {/* <button onClick={handleDelete}>Delete Recipe</button> */}
        </>
      )}
    </div>)
}

export default Recipe;