import { Typography, Button, Grid } from "@mui/material";
import * as React from "react";
import axios from "axios";
import { backendURL } from "../../../configKeys";
import DocViewer from "../Components/DocViewer";

export default function AddGuidelines() {
  // function to upload file
  function fileUpload(event) {
    if (event.target.files[0].type != "application/pdf") {
      alert("Please upload PDF file");
      return;
    } else {
      const data = new FormData();
      data.append("file", event.target.files[0], event.target.files[0].name);
      const URL = backendURL + "/File/upload";
      axios.post(URL, data).then(function (response) {
        if (response && response.data && response.data.filename) {
          alert("File uploaded to mongo");
          console.log(response.data.filename);
          // filename stored in crypto format hence will be unique - to check filename see upload.files collection in mongo
          // here add response.data.filename to SQL backend
        }
      });
    }
  }

  return (
    <>
      <Typography>Guidelines Page</Typography>
      <Grid container spacing={3}>
        <Grid sm item>
          <Button fullWidth variant="outlined">
            <input
              type="file"
              onChange={(event) => fileUpload(event)}
              style={{ color: "transparent" }}
            />
            Choose File
          </Button>
        </Grid>
        <Grid sm item></Grid>
      </Grid>
      <Typography>View File</Typography>

      {/* filename to be passed here as props now passing hard coded filename stored at index 0 in mongo - 62d0981f9cbf63f99a6e6ea7a677aa861702125661214.pdf */}
      <DocViewer filename={"62d0981f9cbf63f99a6e6ea7a677aa861702125661214.pdf"} contentType="application/pdf" />
    </>
  );
}
