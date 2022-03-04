import { FormEvent, useRef, useState } from "react";
import { IRecipe } from "../../ts/interfaces";
import useFetch from '../../hooks/useFetch';

import LoaderAnimation from "../../components/LoaderAnimation";
import "./Create.scss";

const POST_URL = 'http://localhost:3000/recipes'

export default function Create() {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('0');

  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([]);
  const ingredientInput = useRef<HTMLInputElement>(null);

  const [loading, setLoading] = useState(false);
  const [localError, setLocalError] = useState<string | Error | null | undefined>(null);

  const { setPostOptions, data, error } = useFetch(POST_URL, "POST");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (parseInt(cookingTime) <= 0 || ingredients.length === 0) {
      setLocalError('Please make sure you have included ALL information')
      return;
    }
    const handlePostOptions = setPostOptions ? setPostOptions : () => null
    handlePostOptions(
      { title, method, cookingTime: cookingTime.concat(' minutes'), ingredients }
    )
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

  return (<>
    {loading && <LoaderAnimation />}
    {localError && <h4 className="error">{localError}</h4>}
    <div className="create">
      <h2 className="page-title">Add a New Recipe to the list.</h2>

      <form onSubmit={handleSubmit}>
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