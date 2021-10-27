import { useState, useEffect } from "react";
import { api } from "services/api";

function Reviews({ movieId }) {
  const [reviews, setReviews] = useState(null);

  const fetchReviewsAsync = async (id) => {
    try {
      const response = await api.fetchReviews(id);
      setReviews(response.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReviewsAsync(movieId);
  }, [movieId]);

  return (
    <>
      <hr />
      {reviews && (
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
