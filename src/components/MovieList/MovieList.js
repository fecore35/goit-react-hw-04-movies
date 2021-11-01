import PropTypes from "prop-types";
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

MovieList.propTypes = {
  movie: PropTypes.array.isRequired,
  path: PropTypes.string.isRequired,
};

export default MovieList;
