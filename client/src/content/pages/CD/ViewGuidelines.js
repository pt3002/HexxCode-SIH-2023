import { Typography, Button, Grid, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";
import * as React from "react";
import axios from "axios";
import { useState } from "react";
import { backendURL } from "../../../configKeys";
import DocViewer from "../Components/DocViewer";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fDate } from "../../../utils/formatTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const uuid = require("uuid").v4;
export default function ViewGuidelines() {
  const [rows, setRows] = useState([]);

  const columns = [
    {
      field: "title",
      headerName: "Title",
      flex: 1,
      renderCell: (params) => (
      <div
        style={{
            whiteSpace: "normal",
            overflow: "hidden",
          }}
        >
          {params.value}
        </div>
      ),
    },
    {
      field: "mongo_file_id",
      headerName: "View",
      width: 120,
      renderCell: (params) => (
        <Button>
          <DocViewer
            filename={params.row.mongo_file_id}
            contentType="application/pdf"
          />
        </Button>
      ),
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      width: 120,
      renderCell: (params) => fDate(params.value),
    },
    {
      field: "last_modified_date",
      headerName: "Last Modified",
      width: 120,
      renderCell: (params) =>
        fDate(params.value) ? fDate(params.value) : "Not Modified",
    },
  ];

  React.useEffect(() => {
    axios.get(backendURL + "/CurriculumDeveloper/getGuidelines", {
      headers: {
        "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
      },
    }).then((res) => {
    setRows(res.data.guidelines);
    console.log("THERE");
  });
}, []);

  return (
    <>
      <Grid
        container
        spacing={3}
        alignItems="center"
        justifyContent="center"
        sx={{ marginBottom: "5%" }}
      ></Grid>
      <Box sx={{ width: "96%", margin: "2%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ margin: "2%", textAlign: "center" }}
          gutterBottom
        >
          View AICTE Guidelines
        </Typography>
      </Box>
      <Grid item xs={12} md={12}>
        <Box
          sx={{
            height: 400,
            width: "94%",
            margin: "2%", // Add margin to the DataGrid
          }}
        >
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={5}
            rowHeight={60}
            disableRowSelectionOnClick
            components={{
              Toolbar: GridToolbar,
            }}
          />
        </Box>
      </Grid>
    </>
  );
}