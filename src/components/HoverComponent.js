import React, { useState } from "react";
import PropTypes from "prop-types";

const HoverComponent = ({ children, styles }) => {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <div
      style={
        isHovered ? { opacity: 0.8, ...styles } : { opacity: 1, ...styles }
      }
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}
      {isHovered}
    </div>
  );
};

HoverComponent.propTypes = {
  children: PropTypes.node.isRequired,
  styles: PropTypes.object,
};

HoverComponent.defaultProps = {
  styles: {},
};
export default HoverComponent;
