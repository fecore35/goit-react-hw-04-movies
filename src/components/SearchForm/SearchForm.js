import { useState } from "react";

function SearchForm(props) {
  const [value, setValue] = useState("");

  const handlerSearchQuery = (event) => {
    setValue(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();

    if (!value.trim()) {
      return;
    }

    props.submit(value);
    setValue("");
  };

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

export default SearchForm;
