import { STATUS } from "hooks/status";
import useFetchReviews from "hooks/useFetchReviews";

function Reviews({ movieId }) {
  const { reviews, status, error } = useFetchReviews(movieId);

  return (
    <>
      <hr />
      {status === STATUS.ERROR && error}
      {status === STATUS.LOADING && `Loading...`}
      {status === STATUS.SUCCESS && (
        <ol>
          {reviews.map((item) => {
            return (
              <li key={item.id}>
                {item.author} <br />
                {item.content}
              </li>
            );
          })}
        </ol>
      )}
    </>
  );
}

export default Reviews;
