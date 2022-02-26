import { IRecipe } from "../ts/interfaces";
import "./RecipeCard.scss";


const RecipeCard = ({ title, method }: IRecipe) => {
  return (<div className="card">
    <h3 className="card-title">{title}</h3>
    <p>{method.slice(0, 150)}...</p>
  </div>)
}

export default RecipeCard;