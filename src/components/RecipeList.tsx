import { IRecipe } from "../ts/interfaces";

import RecipeCard from "./RecipeCard";

import "./RecipeList.scss";

export default function RecipeList({ recipes }: { recipes: IRecipe[] }) {
  return (<div className="recipe-list">
    {
      recipes.map((eachRecipe, indx) => {
        return <RecipeCard
          key={eachRecipe.id}
          recipe={eachRecipe}
        />
      })
    }
  </div>)
}