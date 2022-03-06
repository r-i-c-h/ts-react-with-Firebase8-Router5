import { IRecipe } from "../ts/interfaces";

import RecipeCard from "./RecipeCard";

import "./RecipeList.scss";

export default function RecipeList({ recipes }: { recipes: IRecipe[] }) {
  if (recipes.length === 0) {
    return <div className="error">No recipes to show...</div>
  }



  return (<div className="recipe-list">
    {
      recipes.map((eachRecipe) => {
        return <RecipeCard
          key={eachRecipe.id}
          recipe={eachRecipe}
        />
      })
    }
  </div>)
}