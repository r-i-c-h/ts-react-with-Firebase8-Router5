import { useEffect, useState } from "react";
import { handleError } from "../../ts/TS-ErrorHandler.js";
import { projectFirestore } from '../../firebase/config.js';

import { IRecipe } from "../../ts/interfaces";
import "./Home.scss";

import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";


export default function Home() {
  const [data, setData] = useState<null | IRecipe[]>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(false);

  useEffect(() => {
    setIsPending(true);

    const cleanupFunction = projectFirestore.collection('recipes').onSnapshot((snapshot) => {
      if (snapshot.empty) {
        setIsPending(false);
        setError('No Recipes Found in Database!')
      } else {
        const results: IRecipe[] = [];

        snapshot.docs.forEach(doc => {
          const id = doc.id
          const { method, title, ingredients, cookingTime } = doc.data();
          results.push({ id, method, title, ingredients, cookingTime });
        });
        setData(results)
        setIsPending(false);
      }
    },
      (err) => {
        setError(err)
        setIsPending(false);
      }
    )

    return () => cleanupFunction()

  }, []);

  return (
    <div className="home">
      <h1 className="page-title">Home</h1>
      {error && <p className="error">{handleError(error)}</p>}
      {isPending && <LoaderAnimation />}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}