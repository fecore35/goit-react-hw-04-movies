import { Link } from "react-router-dom";

function MovieList({ movie, path }) {
  return (
    movie && (
      <ol>
        {movie.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link to={`${path}/${id}`}>{title}</Link>
            </li>
          );
        })}
      </ol>
    )
  );
}

export default MovieList;
