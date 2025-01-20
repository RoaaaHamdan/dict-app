import React, { useEffect } from "react";
import { DataDisplayComponent, FileInput } from "./components";
import { setupAgGrid } from "./utils/setupAgGrid";
import "react-custom-alert/dist/index.css";
import "./App.css";
import { ToastContainer } from "react-custom-alert";
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    padding: "30px",
    alignItems: "center",
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
      <ToastContainer floatingTime={700} />
    </div>
  );
}

export default App;
