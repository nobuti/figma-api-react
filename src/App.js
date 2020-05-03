import React from "react";

import data from "./colors.json";
import Color from "./components/Color";

const App = () => {
  const styles = {
    display: "flex",
    flexWrap: "wrap",
  };

  return (
    <div className="Container">
      <h1>Colors</h1>
      <ul style={styles}>
        {data.colors.map((c) => (
          <Color key={c.name} {...c} />
        ))}
      </ul>
    </div>
  );
};

export default App;
