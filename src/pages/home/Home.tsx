import { useEffect, useState } from "react";
import { projectFirestore } from '../../firebase/config.js';

import { IRecipe } from "../../ts/interfaces";
import "./Home.scss";

import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";


export default function Home() {
  const [data, setData] = useState<null | IRecipe[]>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<Error | boolean | string>(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore.collection('recipes').get().then((snapshot) => {
      if (snapshot.empty) {
        setError('No Recipes Found in Database!')
        setIsPending(false);
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
    }
    ).catch(err => {
      setError(err.message)
      setIsPending(false);
    })
      .finally(() => setIsPending(false));
  }, []);

  return (
    <div className="home">
      <h1 className="page-title">Home</h1>
      {error && <p className="error">{error}</p>}
      {isPending && <LoaderAnimation />}
      {data && <RecipeList recipes={data} />}
    </div>
  )
}