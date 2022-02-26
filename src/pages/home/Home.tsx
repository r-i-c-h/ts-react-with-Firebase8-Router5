import useFetch from "../../hooks/useFetch";
import { IRecipe } from "../../ts/interfaces";
import "./Home.scss";

const Home = () => {
  const { data, isPending, error } = useFetch<IRecipe>('http://localhost:3000/recipes')

  console.log("🚀 ~ file: Home.tsx ~ line 12 ~ Home ~ data, isPending, error", data, isPending, error)
  return (<div className="home">
    <h2>Home</h2>
  </div>)
}

export default Home;