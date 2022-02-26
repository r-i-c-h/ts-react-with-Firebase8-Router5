import LoaderAnimation from "../../components/LoaderAnimation";
import useFetch from "../../hooks/useFetch";
import { IRecipe } from "../../ts/interfaces";
import "./Home.scss";

const Home = () => {
  const { data, isPending, error } = useFetch<IRecipe>('http://localhost:3000/recipes')
  console.log(data);

  return (<div className="home">
    <h2>Home</h2>
    {error && <p className="error">{error}</p>}
    {isPending && <LoaderAnimation />}
  </div>)
}

export default Home;