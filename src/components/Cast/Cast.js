import { STATUS } from "hooks/status";
import useFetchCast from "hooks/useFetchCast";

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

export default Cast;
