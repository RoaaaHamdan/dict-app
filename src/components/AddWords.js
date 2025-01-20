import React from "react";
import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { addWords } from "../store/add";
import { fetchWords } from "../store/fetch-data";
import { AddIcon } from "../icons";
import HoverComponent from "./HoverComponent";
import { toast } from "react-custom-alert";

const ExcelDateToJSDate = (date) => {
  if (date !== "NULL") {
    const jsDate = new Date((date - (25567 + 2)) * 86400 * 1000);
    return jsDate.toLocaleString("en-US", { hour12: true });
  }
  return "N/A";
};

const processSheetData = (sheetData, keysToConvert) => {
  return sheetData.map((row) => {
    keysToConvert.forEach((key) => {
      if (row[key]) {
        row[key] = ExcelDateToJSDate(row[key]);
      }
    });
    return row;
  });
};

const readFile = (file, callback) => {
  const reader = new FileReader();

  reader.onload = (event) => {
    const workbook = XLSX.read(event.target.result, { type: "binary" });
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const sheetData = XLSX.utils.sheet_to_json(sheet, { raw: true });
    callback(sheetData);
  };

  reader.onerror = () => {
    toast.error("Failed to read the file.");
  };

  reader.readAsBinaryString(file);
};

function FileInput() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.words);

  const styles = {
    container: {
      width: "fit-content",
      padding: "10px",
      background: "rgb(0, 72, 174)",
      borderRadius: 10,
      display: "flex",
      flexDirection: "row",
      gap: "5px",
      justifyContent: "center",
      alignItems: "center",
      color: "white",
      cursor: "pointer",
    },
    icon: {
      width: "20px",
      height: "20px",
    },
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const keysToConvert = ["CreationTime", "LastModificationTime"];

    readFile(file, (sheetData) => {
      const formattedData = processSheetData(sheetData, keysToConvert);
      dispatch(addWords(formattedData.slice(0, 20)));

      if (!loading) {
        toast.success("Data added successfully");
        dispatch(fetchWords());
      }
      e.target.value = "";
    });
  };

  return (
    <HoverComponent styles={styles.container}>
      <label htmlFor="formId">
        <span style={{ cursor: "pointer" }}>Add new words</span>
        <input
          type="file"
          accept=".xlsx,.xls"
          id="formId"
          hidden
          onChange={handleFileUpload}
        />
      </label>
      <div style={styles.icon}>
        <AddIcon />
      </div>
    </HoverComponent>
  );
}

export default FileInput;
