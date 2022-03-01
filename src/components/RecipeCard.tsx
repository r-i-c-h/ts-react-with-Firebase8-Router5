import { IRecipe } from "../ts/interfaces";
import "./RecipeCard.scss";


export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const { title, method } = recipe;
  return (<div className="card">
    <h3 className="card-title">{title}</h3>
    <p>{method.slice(0, 150)}...</p>
  </div>)
}
