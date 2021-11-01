import { useState, useMemo, useEffect } from "react";
import PropTypes from "prop-types";
import { useUrlQuery } from "../../hooks/useUrlQuery";

function SearchForm(props) {
  const [value, setValue] = useState("");
  const query = useUrlQuery();
  const locationQuery = useMemo(() => query.get("query"), [query]);

  const handlerSearchQuery = (event) => {
    setValue(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (!value.trim() || locationQuery === value) {
      alert("Please enter another request");
      return;
    }

    props.submit(value);
  };

  useEffect(() => {
    if (!locationQuery) {
      setValue("");
      return;
    }

    setValue(locationQuery);
  }, [locationQuery]);

  return (
    <form onSubmit={handlerSubmit}>
      <input
        type="text"
        name="query"
        autoComplete="off"
        autoFocus
        value={value}
        onChange={handlerSearchQuery}
      />
      <button type="submit">Search</button>
    </form>
  );
}

SearchForm.propTypes = {
  submit: PropTypes.func.isRequired,
};

export default SearchForm;
