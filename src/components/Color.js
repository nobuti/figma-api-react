import React from "react";

const Color = ({ name, background }) => {
  const styles = {
    width: 200,
    height: 200,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    border: "1px solid #ddd",
    marginRight: 8,
    marginBottom: 8,
  };

  return (
    <li id={name} style={{ ...styles, background }}>
      {name}
    </li>
  );
};

export default Color;
