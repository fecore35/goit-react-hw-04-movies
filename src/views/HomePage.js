import { useFetchTrendingMoviesForDay } from "../hooks/react-query/useFetchTrendingMoviesForDay";
import MovieList from "components/MovieList";

function HomePage() {
  const { data, error, isError, isLoading } = useFetchTrendingMoviesForDay();

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Error! {error.message}</h2>;
  }

  return (
    <section>
      <h2>TOP 20</h2>

      <MovieList movie={data} path={`movies`} />
    </section>
  );
}

export default HomePage;
