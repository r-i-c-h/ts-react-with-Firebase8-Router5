import { useLocation } from "react-router-dom";
import { IRecipe } from "../../ts/interfaces";

import { projectFirestore } from "../../firebase/config";
import { handleError } from "../../ts/TS-ErrorHandler";
import LoaderAnimation from "../../components/LoaderAnimation";
import RecipeList from "../../components/RecipeList";

import "./Search.scss";
import { useEffect, useState } from "react";

export default function Search() {
  //! This is NOT an industrial strength solution
  const [data, setData] = useState<null | IRecipe[]>(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(false);

  const queryString = useLocation().search // ?q=Yada%20Yada
  const queryParams = new URLSearchParams(queryString)
  let query = queryParams.get('q')


  useEffect(() => {
    projectFirestore.collection('recipes').orderBy('title').get()
      .then((snapshot) => {
        if (snapshot.empty) {
          setIsPending(false);
          setError('No Recipes Found in Database!')
        } else {
          const results: IRecipe[] = [];
          const q = String(query).toLowerCase()
          snapshot.docs.forEach(doc => {
            const id = doc.id
            const { method, title, ingredients, cookingTime } = doc.data();
            results.push({ id, method, title, ingredients, cookingTime });
          });
          const filtered = results.filter(rec => {
            let title = rec.title.toLowerCase();
            let method = rec.method.toLowerCase();  //? You could continue, but ya get the point...
            if (title.includes(q) || method.includes(q)) {
              return true
            }
            return false
          })
          setData(filtered)
          setIsPending(false);
        }
      })
      .catch(err => {
        setError(err)
        setIsPending(false);
      })
  }, [query])

  return (
    <div className="search">
      <h2 className="page-title">Search Results</h2>
      {error && <div className="error">{handleError(error)}</div>}
      {isPending && <LoaderAnimation />}
      {data && <>
        <h3>Found {data.length} result{data.length === 1 ? '' : `s`} for the search term "{query}"</h3>
        <RecipeList recipes={data} />
      </>}
    </div>
  )
}