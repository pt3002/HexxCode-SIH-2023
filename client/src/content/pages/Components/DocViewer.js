import axios from "axios";
import { backendURL } from "../../../configKeys";
import { useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import VisibilityIcon from "@mui/icons-material/Visibility";

const DocViewer = (data) => {
  let filename = data.filename;
  let contentType = data.contentType;
  const [loading, setLoading] = useState(false);
  const onClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 10000);
    axios
      .get(backendURL + "/File/get/" + filename,
       {
        responseType: "blob",
      }
    )
      .then((response) => {
        // console.log(response)
        //Create a Blob from the PDF Stream
        const file = new Blob([response.data], { type: contentType });
        // Build a URL from the file
        const fileURL = URL.createObjectURL(file);
        const w = window.open(
          fileURL,
          "",
          "width=800,height=600,left=200,top=200"
        );
        w.onload = function () {
          setLoading(false);
          w.document.title = filename;
        };
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div>
    <div className="previewIcon" onClick={onClick}>
      {loading ? (
        <CircularProgress size="1em" color="inherit" />
      ) : (
        <VisibilityIcon />
      )}
    </div>
    </div>
  );
};

export default DocViewer;
