import React from "react";
import { BsFillHeartFill } from "react-icons/bs";

const Favourite = (props) => {
  const { updateFavouriteStatus, todo } = props;
  return (
    <>
      {todo.favourite === "true" ? (
        <BsFillHeartFill
          size={15}
          style={{ color: "red", margin: "10px", cursor: "pointer" }}
          onClick={() => {
            updateFavouriteStatus(todo.key, "false");
          }}
          className="custom-icons"
          title="Remove from favourites."
        />
      ) : (
        <BsFillHeartFill
          size={15}
          style={{ color: "gray", margin: "10px", cursor: "pointer" }}
          onClick={() => {
            updateFavouriteStatus(todo.key, "true");
          }}
          className="custom-icons"
          title="Add to favourites."
        />
      )}
    </>
  );
};

export default Favourite;
