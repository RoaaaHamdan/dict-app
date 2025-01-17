import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { fetchWords, updateWord } from "../store/fetch-data";
import DeleteButtonComponent from "./DeleteButtonComponent";

function DataDisplayComponent() {
  const dispatch = useDispatch();
  const { words, keys, loading, status, error } = useSelector(
    (state) => state.words,
  );
  const [rowData, setRowData] = useState([]);
  useEffect(() => {
    dispatch(fetchWords());
  }, [dispatch]);

  useEffect(() => {
    if (words.length > 0) {
      setRowData(words.map((word) => ({ ...word })));
    }
  }, [words]);

  const handleCellValueChanged = async (event) => {
    const updatedData = event.data;
    await dispatch(updateWord(updatedData));
    let statusMessage = "";
    if (status) {
      statusMessage = "Word updated successfully!";
    } else if (!status) {
      statusMessage = `Error: ${error || "Failed to update word."}`;
    }
    alert(statusMessage);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  const rowClassRules = {
    "even-row": (params) => params.node.rowIndex % 2 === 0,
    "odd-row": (params) => params.node.rowIndex % 2 !== 0,
  };
  const styles = {
    emptyData: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: "bold",
      fontStyle: "italic",
      height: "100%",
    },
  };

  const domLayout = rowData.length < 8 ? "autoHeight" : "normal";

  if (!rowData.length) {
    return <div style={styles.emptyData}>No data available</div>;
  }
  return (
    <div style={{ height: 500, width: "100%" }}>
      <AgGridReact
        rowClassRules={rowClassRules}
        domLayout={domLayout}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 50]}
        rowData={rowData}
        columnDefs={[
          ...keys,
          { field: "button", cellRenderer: DeleteButtonComponent },
        ]}
        onCellValueChanged={handleCellValueChanged}
      />
    </div>
  );
}

export default DataDisplayComponent;
