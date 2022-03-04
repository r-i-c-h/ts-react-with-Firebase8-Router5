import { FormEvent, useRef, useState, useEffect } from "react";
import useFetch from '../../hooks/useFetch';

import LoaderAnimation from "../../components/LoaderAnimation";
import "./Create.scss";
import { useHistory } from "react-router-dom";

const POST_URL = 'http://localhost:3000/recipes'

export default function Create() {
  const history = useHistory();
  //*-----*//
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('0');
  //*-----*//
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('')
  const ingredientInput = useRef<HTMLInputElement>(null);
  //*-----*//
  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | Error | null | undefined>(null);
  //*-----*//

  const { postData, data, isPending, error } = useFetch(POST_URL, "POST");

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(cookingTime) <= 0 || ingredients.length === 0) {
      setLocalError('Please make sure you have included ALL information')
      return;
    }

    const setPost = postData ? postData : () => null
    setPost({ title, method, ingredients, cookingTime: cookingTime.concat(' minutes') })
    if (error) { setLocalError(error); return }
  }

  const handleAddNewIngredient = (e: FormEvent) => {
    e.preventDefault();
    const ing = newIngredient.trim();
    if (ing && !ingredients.includes(ing)) {
      setIngredients(ingredients => [...ingredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current?.focus();
  }

  // REDIRECT User after POST response:
  useEffect(() => {
    if (data) {
      history.push('/')
    }
  }, [data])

  return (<>
    {loading && <LoaderAnimation />}
    {localError && <h4 className="error">{localError}</h4>}
    <div className="create">
      <h2 className="page-title">Add a New Recipe to the list.</h2>

      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input type="text"
            onChange={e => { setTitle(e.target.value) }}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input type="text"
              ref={ingredientInput}
              onChange={e => { setNewIngredient(e.target.value) }}
              value={newIngredient}
            />
            <button onClick={handleAddNewIngredient} className="btn">add</button>
          </div>
        </label>
        {ingredients.length > 0 && (<p>Uses: {ingredients.map(i => <em key={i}>{i}, </em>)}</p>)}


        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={e => { setMethod(e.target.value) }}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking time (in minutes):</span>
          <input type="number" min="1"
            onChange={e => {
              setCookingTime(e.target.value);
            }}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn ">Submit</button>
      </form>
    </div>
  </>)
}