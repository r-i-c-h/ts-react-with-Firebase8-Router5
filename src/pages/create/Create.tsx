import { FormEvent, useRef, useState } from "react";

import "./Create.scss";

const Create = () => {
  const [title, setTitle] = useState('');
  const [method, setMethod] = useState('');
  const [cookingTime, setCookingTime] = useState('');
  const [newIngredient, setNewIngredient] = useState('')
  const [ingredients, setIngredients] = useState<string[]>([]);

  const ingredientInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ title, method, cookingTime })
  }

  const handleAdd = (e: FormEvent) => {
    e.preventDefault();
    const ing = newIngredient.trim();

    if (ing && !ingredients.includes(ing)) {
      setIngredients(ingredients => [...ingredients, ing])
    }
    setNewIngredient('')
    ingredientInput.current?.focus();
  }

  return (
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
              required />
            <button onClick={handleAdd} className="btn">add</button>
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
          <span>Cooking time (minutes):</span>
          <input type="number"
            onChange={e => { setCookingTime(e.target.value) }}
            value={cookingTime}
            required
          />
        </label>
        <button className="btn ">Submit</button>
      </form>
    </div>)
}

export default Create;