import PropTypes from "prop-types";
import s from "./MovieCard.module.css";
import noPoster from "../../images/poster-404.png";

function MovieCard({ title, date, poster, genres, overview }) {
  const arrayDate = date.split("-");
  const movieYear = arrayDate[0];

  return (
    <div className={s.row}>
      <div className={s.row__image}>
        <img className={s.image} src={poster ?? noPoster} alt={title} />
      </div>

      <div className={s.row__content}>
        <h1>
          {title} {date && `(${movieYear})`}
        </h1>

        {genres &&
          genres.map(({ id, name }) => {
            return <span key={id}>{name} </span>;
          })}
        <p>{overview}</p>
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  title: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  poster: PropTypes.string,
  genres: PropTypes.array,
  overview: PropTypes.string,
};

export default MovieCard;
