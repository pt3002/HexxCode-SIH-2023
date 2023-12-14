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
      width: 150,
    },
    {
      field: "mongo_file_id",
      headerName: "View",
      width: 110,
      renderCell: (params) => {
        return (
          <Button>
            <DocViewer
              filename={params.row.mongo_file_id}
              contentType="application/pdf"
            />
          </Button>
        );
      },
    },
    {
      field: "creation_date",
      headerName: "Creation Date",
      width: 110,
      renderCell: (params) => {
        return fDate(params.row.creation_date);
      },
    },
    {
      field: "last_modified_date",
      headerName: "Last Modified",
      width: 110,
      renderCell: (params) => {
        return fDate(params.row.last_modified_date)
          ? fDate(params.row.last_modified_date)
          : "Not Modified";
      },
    },
  ];


  React.useEffect(() => {
    axios.get(backendURL + "/CurriculumDeveloper/getGuidelines", {
      headers: {
        "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
      },
    }).then((res) => {
      setRows(res.data.guidelines);
      console.log("THERE")
    });
  }, []);

  return (
    <>
      <Box sx={{ height: 400, width: "96%", margin: "2%" }}>
      <Typography variant="h3" component="h3" sx={{margin: "2%" , marginBottom: "2%"}} gutterBottom >
             View AICTE Guidelines
            </Typography>
        <DataGrid
          sx={{margin: "2%" }}
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          disableRowSelectionOnClick
        />
      </Box>
    </>
  );
}
