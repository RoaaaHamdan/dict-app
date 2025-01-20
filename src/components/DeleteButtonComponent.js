import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteWord } from "../store/delete";
import { removeWord } from "../store/fetch-data";
import { DeleteIcon } from "../icons";
import HoverComponent from "./HoverComponent";
import { confirmAlert } from "react-confirm-alert";
import { toast } from "react-custom-alert";

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
      opacity: isHovered ? 0.6 : 1,
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
  const options = {
    title: "Delete word",
    message: "Are you sure you want to delete this word?",
    buttons: [
      {
        label: "Yes",
        onClick: () => {
          dispatch(deleteWord(id.data.id));
          dispatch(removeWord(id.data.id));
          toast.success("Word deleted successfully.");
        },
      },
      {
        label: "No",
      },
    ],
    closeOnEscape: true,
    closeOnClickOutside: true,
    keyCodeForClose: [8, 32],
  };

  const handleDeleteClick = () => {
    confirmAlert(options);
  };

  return (
    <HoverComponent>
      <button
        title="Delete"
        style={styles.button}
        onClick={handleDeleteClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <DeleteIcon style={styles.icon} />
      </button>
    </HoverComponent>
  );
};

export default DeleteButtonComponent;
