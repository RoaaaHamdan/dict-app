import React, { useEffect } from "react";
import { DataDisplayComponent, FileInput } from "./components";
import { setupAgGrid } from "./utils/setupAgGrid";
import "./App.css";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px",
  },
};

function App() {
  useEffect(() => {
    setupAgGrid();
  }, []);

  return (
    <div style={styles.container}>
      <FileInput />
      <DataDisplayComponent />
    </div>
  );
}

export default App;
