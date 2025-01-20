import React from "react";
import PropTypes from "prop-types";
import { LtrIcon, RtlIcon } from "../icons";
import HoverComponent from "./HoverComponent";

const DirectionComponent = ({ isRtl, onClick }) => {
  return (
    <HoverComponent styles={{ height: "fit-content" }}>
      <button
        title={isRtl ? "Left to right" : "Right to left"}
        style={{
          marginTop: "10px",
          background: "none",
          height: "20px",
          width: "20px",
          border: "none",
          cursor: "pointer",
        }}
        onClick={onClick}
      >
        {isRtl ? <LtrIcon /> : <RtlIcon />}
      </button>
    </HoverComponent>
  );
};
DirectionComponent.propTypes = {
  isRtl: PropTypes.node.isRequired,
  onClick: PropTypes.func.isRequired,
};

DirectionComponent.defaultProps = {
  isRtl: false,
};
export default DirectionComponent;
