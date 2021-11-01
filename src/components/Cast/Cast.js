import PropTypes from "prop-types";
import useFetchCast from "hooks/useFetchCast";
import { STATUS } from "hooks/status";

function Cast({ movieId }) {
  const { cast, status, error } = useFetchCast(movieId);

  return (
    <>
      <hr />
      {status === STATUS.ERROR && error}
      {status === STATUS.LOADING && `Loading...`}
      {status === STATUS.SUCCESS && (
        <ol>
          {cast.map((item) => {
            return <li key={item.id}>{item.name}</li>;
          })}
        </ol>
      )}
    </>
  );
}

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;
