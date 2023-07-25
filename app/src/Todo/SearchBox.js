import React from "react";
import "./SearchBox.css";
import debounce from "lodash.debounce";
import { useCallback } from "react";

const SearchBox = (props) => {
  const { todoData, setFilterState } = props;

  const changeHandler = (event) => {
    const searchCriteria = event.target.value.toLowerCase();
    setFilterState(["Search - ", searchCriteria]);
  };

  const debouncedChangeHandler = useCallback(debounce(changeHandler, 400), []);

  return (
    <input
      type="text"
      class="search-hover"
      name=""
      placeholder="search here..."
      onChange={debouncedChangeHandler}
    />
  );
};

export default SearchBox;
