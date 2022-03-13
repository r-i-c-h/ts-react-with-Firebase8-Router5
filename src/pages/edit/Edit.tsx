import { FormEvent, useRef, useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { projectFirestore } from '../../firebase/config.js';
import { handleError } from "../../ts/TS-ErrorHandler.js";

import LoaderAnimation from "../../components/LoaderAnimation";

import "./Edit.scss";
import { useTheme } from "../../hooks/useTheme";
import { IRecipe } from "../../ts/interfaces.js";

export default function Edit() {
  const { mode } = useTheme();
  const { id } = useParams<{ id: string }>();
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
    const docUpdate = { title, method, ingredients, cookingTime: cookingTime.concat(' minutes') }
    setIsPending(true)
    try {
      setIsPending(false);
      await projectFirestore.collection('recipes').doc(id).update(docUpdate);
      history.push(`/recipes/${id}`)
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
  const handleRemoveIngredient = (e: FormEvent, ing: string) => {
    e.preventDefault()
    setIngredients(ingredients => ingredients.filter(i => i !== ing))
    ingredientInput.current?.focus();
  }

  useEffect(() => {
    setIsPending(true);
    projectFirestore.collection('recipes').doc(id).get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false)
          const { method, title, ingredients, cookingTime } = doc.data() as IRecipe
          setMethod(method)
          setTitle(title)
          setIngredients(ingredients)
          setCookingTime(cookingTime.replace(' minutes', ''))
        } else {
          setError(`Sorry, but there's a problem with Recipe ID:${id} in my Database!`)
        }
        setIsPending(false)
      })
      .catch(err => {
        setIsPending(false);
        setError(err);
      })

  }, [id]);

  return (<>
    {isPending && <LoaderAnimation />}
    {error && <h4 className="error">{handleError(error)}</h4>}

    <div className={`create ${mode}`}>
      <h2 className="page-title">Edit Recipe #:<code>{`${id}`}</code></h2>

      <form onSubmit={handleFormSubmit}>
        <label>
          <span>Recipe Title:</span>
          <input type="text"
            className="recipe-tile"
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
        {ingredients.length > 0 && (<p>Uses: {
          // { ingredients.map(i => <em key={i}>{i}, </em>) }
          ingredients.map(i => <span key={i}>
            <button
              className="mini-btn"
              onClick={(e) => handleRemoveIngredient(e, i)}>
              &times;
            </button>{i},
          </span>)
        }
        </p>)
        }


        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={e => { setMethod(e.target.value) }}
            value={method}
            rows={5}
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

        <button className="btn">Update</button>
      </form>
    </div>
  </>)
}