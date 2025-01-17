import React from "react";
import { useDispatch } from "react-redux";
import { deleteWord } from "../store/delete";
import { removeWord } from "../store/fetch-data";

const DeleteButtonComponent = (id) => {
  const dispatch = useDispatch();
  const buttonStyles = {
    backgroundColor: "red",
    color: "white",
    opacity: 0.8,
    borderRadius: "8px",
    padding: "10px 20px",
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.3s",
  };
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this word?",
    );

    if (isConfirmed) {
      dispatch(deleteWord(id.data.id));
      dispatch(removeWord(id.data.id));
      alert(id.data.id);
    }
  };

  return (
    <button style={buttonStyles} onClick={handleDeleteClick}>
      Delete
    </button>
  );
};

export default DeleteButtonComponent;
