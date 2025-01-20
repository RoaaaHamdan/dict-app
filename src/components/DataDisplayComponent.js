import React, { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { fetchWords, updateWord } from "../store/fetch-data";
import DeleteButtonComponent from "./DeleteButtonComponent";
import TableDirectionComponent from "./TableDirectionComponent";
import { keys } from "../const";
import useIsMobile from "../custom-hooks/useIsMobile";

function DataDisplayComponent() {
  const dispatch = useDispatch();
  const { words, loading } = useSelector((state) => state.words);
  const [rowData, setRowData] = useState([]);
  const [isRtl, setRtl] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    dispatch(fetchWords());
  }, []);

  useEffect(() => {
    if (words.length > 0) {
      setRowData(words.map((word) => ({ ...word })));
    }
  }, [words]);

  const myTheme = themeQuartz.withParams({
    backgroundColor: "rgb(227, 232, 249)",
    foregroundColor: "rgb(0, 72, 174)",
    headerTextColor: "rgb(250, 250, 250)",
    headerBackgroundColor: "rgb(0, 72, 174)",
    oddRowBackgroundColor: "rgb(0, 0, 0, 0.03)",
    headerColumnResizeHandleColor: "rgb(0, 72, 174)",
  });

  const theme = useMemo(() => {
    return myTheme;
  }, []);
  const handleCellValueChanged = async (event) => {
    const updatedData = event.data;
    if (event.newValue) {
      await dispatch(updateWord(updatedData));
    } else {
      alert("Please enter a valid value");
      setRowData((prevData) =>
        prevData.map((row, i) =>
          i == event.rowIndex ? { ...words[event.rowIndex] } : { ...row },
        ),
      );
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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

  const domLayout = isMobile ? "normal" : "print";

  if (!words.length) {
    return <div style={styles.emptyData}>No data available</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        ...(isMobile ? { height: "500px",flexDirection:'column',  gap: "20px"} : {
         gap: "10px",

        }),
      }}
    >
      <TableDirectionComponent onClick={() => setRtl(!isRtl)} isRtl={isRtl} />

      <AgGridReact
        domLayout={domLayout}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[5, 10, 50]}
        theme={theme}
        rowData={rowData}
        columnDefs={[
          ...keys,
          {
            field: "delete",
            cellRenderer: DeleteButtonComponent,
            maxWidth: 100,
          },
        ]}
        onCellValueChanged={handleCellValueChanged}
        enableRtl={isRtl}
      />
    </div>
  );
}

export default DataDisplayComponent;
