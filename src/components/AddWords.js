import React from "react";
import * as XLSX from "xlsx";
import { useSelector, useDispatch } from "react-redux";
import { addWords } from "../store/add";
import { fetchWords } from "../store/fetch-data";

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

  reader.onerror = (error) => {
    console.error("File reading error:", error);
    alert("Failed to read the file.");
  };

  reader.readAsBinaryString(file);
};

function FileInput() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.words);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const keysToConvert = ["CreationTime", "LastModificationTime"];

    readFile(file, (sheetData) => {
      const formattedData = processSheetData(sheetData, keysToConvert);
      dispatch(addWords(formattedData.slice(0, 3)));

      if (!loading) {
        alert("Data added successfully");
        dispatch(fetchWords());
      }
      e.target.value = "";
    });
  };

  return (
    <div
      style={{
        width: "fit-content",
        padding: "20px",
        background: "blue",
        opacity: ".8",
        borderRadius: 4,
        display: "flex",
        alignSelf: "end",
      }}
    >
      <label htmlFor="formId">
        Add new words
        <input type="file" id="formId" hidden onChange={handleFileUpload} />
      </label>
    </div>
  );
}

export default FileInput;
