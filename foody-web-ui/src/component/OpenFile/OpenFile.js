import React, { useState, useRef, useContext } from "react";
import * as XLSX from "xlsx";
import mainContext from "../../context/mainContext";
import { httpClient } from "../../share/httpClient";

const OpenFile = (props) => {
  const { locationCode, setIsLoading, setUpdated, updated } = props;
  const inputFile = useRef(null);
  const { token } = useContext(mainContext);
  const handleFileUpload = (e) => {
    const { files } = e.target;
    if (files && files.length) {
      const filename = files[0].name;

      var parts = filename.split(".");
      const fileType = parts[parts.length - 1];
      console.log("fileType", fileType); //ex: zip, rar, jpg, svg etc.

      const reader = new FileReader();
      reader.onload = (evt) => {
        // evt = on_file_select event
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: "binary" });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        /* Update state */
        console.log(convertToJson(data));
        httpClient
          .post("api/v1/user", convertToJson(data), token)
          .then((res) => {
            setUpdated(!updated);
            setIsLoading(false);
            let ws = XLSX.utils.json_to_sheet(res.data);
            let wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
            let exportFileName = `workbook.xls`;
            XLSX.writeFile(wb, exportFileName);
          })
          .catch((error) => {
            setIsLoading(false);
            console.log(error.response);
          });
      };
      reader.readAsBinaryString(files[0]);
    }
  };
  const convertToJson = (csv) => {
    var lines = csv.split("\n");

    var result = [];

    var headers = lines[0].split(",");

    for (var i = 1; i < lines.length; i++) {
      var currentline = lines[i].split(",");
      if (currentline.length > 1) {
        var obj = {};
        for (var j = 0; j < headers.length; j++) {
          obj[headers[j]] = currentline[j];
        }
        obj["location"] = locationCode;
        result.push(obj);
      }
    }

    return result;
  };
  const onButtonClick = () => {
    inputFile.current.click();
  };

  return (
    <div>
      <input
        style={{ display: "none" }}
        accept=".xlsx"
        ref={inputFile}
        onChange={handleFileUpload}
        type="file"
      />
      <div className="button" onClick={onButtonClick}>
        Upload
      </div>
    </div>
  );
};

export default OpenFile;
