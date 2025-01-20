import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWord } from "../store/delete";
import { removeWord } from "../store/fetch-data";
import { DeleteIcon } from "../icons";
import HoverComponent from "./HoverComponent";

const DeleteButtonComponent = (id) => {
  const dispatch = useDispatch();
  const [isHovered, setIsHovered] = useState(false);

  const styles = {
    button: {
      background: "none",
      color: "white",
      border: "none",
      cursor: "pointer",
      transition: "opacity 0.3s ease",
      opacity: isHovered ? 0.6 : 1, // Change opacity dynamically
      width: "20px",
      height: "20px",
    },
    icon: {
      width: "10px",
      height: "10px",
      color: "red",
      background: "red",
      cursor: "pointer",
    },
  };
  const handleDeleteClick = () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete this word?",
    );

    if (isConfirmed) {
      dispatch(deleteWord(id.data.id));
      dispatch(removeWord(id.data.id));
    }
  };

  return (
    <HoverComponent>
      <button
        title="Delete"
        style={styles.button}
        onClick={handleDeleteClick}
        onMouseEnter={() => setIsHovered(true)} // Track hover
        onMouseLeave={() => setIsHovered(false)} // Reset hover
      >
        <DeleteIcon style={styles.icon} />
      </button>
    </HoverComponent>
  );
};

export default DeleteButtonComponent;
