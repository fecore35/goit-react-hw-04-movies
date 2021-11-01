import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

function MovieList({ movie, path, backText }) {
  const location = useLocation();

  return (
    movie && (
      <ol>
        {movie.map(({ id, title }) => {
          return (
            <li key={id}>
              <Link
                to={{
                  pathname: `${path}/${id}`,
                  state: {
                    from: location,
                    label: backText,
                  },
                }}
              >
                {title}
              </Link>
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
  backText: PropTypes.string,
};

export default MovieList;
