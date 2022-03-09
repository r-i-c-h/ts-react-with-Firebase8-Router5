import { IRecipe } from "../ts/interfaces";
import { Link } from "react-router-dom";
import "./RecipeCard.scss";
import { useTheme } from "../hooks/useTheme";


export default function RecipeCard({ recipe }: { recipe: IRecipe }) {
  const { mode } = useTheme();

  const { title, method, cookingTime, id } = recipe;
  return (<div className={`card ${mode}`}>
    <h3 className="card-title">{title}</h3>
    <p>(Approx. {cookingTime})</p>
    <div className="snippet">{method.substring(0, 100)}...</div>
    <Link to={`/recipes/${id}`}>Cook This</Link>
  </div>)
}
