import { FormEvent, useRef, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { projectFirestore } from '../../firebase/config.js';
import { handleError } from "../../ts/TS-ErrorHandler.js";

import LoaderAnimation from "../../components/LoaderAnimation";

import "./Create.scss";
import { useTheme } from "../../hooks/useTheme";

export default function Create() {
  const { mode } = useTheme();
  const history = useHistory(); // for changing URL on POST success
  //*-----*//
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('0');
  //*-----*//
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState('')
  const ingredientInput = useRef<HTMLInputElement>(null);
  //*-----*//
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<unknown>(null);
  //*-----*//

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (ingredients.length === 0) {
      setError('Please make sure you have included ALL information, including ingredients!')
      return;
    }

    const newDoc = { title, method, ingredients, cookingTime: cookingTime.concat(' minutes') }
    setIsPending(true)
    try {
      await projectFirestore.collection('recipes').add(newDoc)
      setIsPending(false);
      history.push('/')
    } catch (err) {
      setIsPending(false);
      setError(err)
    }
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
    {isPending && <LoaderAnimation />}
    {error && <h4 className="error">{handleError(error)}</h4>}

    <div className={`recipe ${mode}`}>
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

        <button className="btn">Submit</button>
      </form>
    </div>
  </>)
}