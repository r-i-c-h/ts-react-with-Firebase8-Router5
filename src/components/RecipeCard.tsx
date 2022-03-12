import { Link } from "react-router-dom";
import { projectFirestore } from "../firebase/config";
import { IRecipe } from "../ts/interfaces";

import { useTheme } from "../hooks/useTheme";

import TrashcanIcon from "./../assets/trashcan.svg";
import "./RecipeCard.scss";

const handleDelete = (id: string) => {
  projectFirestore.collection('recipes').doc(id).delete()
}

export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const { mode } = useTheme();

  const { title, method, cookingTime, id } = recipe;
  return (<div className={`card ${mode}`}>
    <h3 className="card-title">{title}</h3>
    <p>(Approx. {cookingTime})</p>
    <div className="snippet">{method.substring(0, 100)}...</div>
    <Link to={`/recipes/${id}`}>Cook This</Link>
    <img
      className="delete"
      src={TrashcanIcon}
      alt="Trashcan Icon"
      onClick={() => handleDelete(String(id))}
    />
  </div>)
}
