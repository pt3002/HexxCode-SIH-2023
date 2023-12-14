import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import { backendURL } from "../../../configKeys";
import { fDate } from "../../../utils/formatTime";
import axios from "axios";
import Swal from "sweetalert2";
const uuid = require("uuid").v4;


export default function ViewRequirements() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState(0);
  const [req, setReq] = useState({
    RowNum: "",
    department: "",
    educator_id: "",
    id: "",
    requirement_text: "",
    subject: "",
  });

  const columns = [
    {
      field: "RowNum",
      headerName: "Number",
      width: 100,
      editable: true,
    },
    {
      field: "educator_id",
      headerName: "Educator ID",
      width: 200,
      editable: true,
    },
    {
      field: "id",
      headerName: "Requirement ID",
      width: 200,
      editable: true,
    },
    {
      field: "department",
      headerName: "Department",
      width: 200,
      editable: true,
    },
    {
      field: "subject",
      headerName: "Subject",
      width: 200,
      editable: true,
    },
    {
      field: "Action",
      headerName: "Action",
      width: 100,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            onClick={() => {
              handleClickOpen();
              getReqText(params.id);
              // setReq({
              //   id:params.id,
              //   department:params.department,
              //   subject:params.subject,
              //   req_text:getReqText(params.RowNum)

              // });
            }}
          >
            View
          </Button>
        </>
      ),
    },
  ];

  
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const getReqText = (id) => {
    const req_item = rows.find((item) => item.id === id);
    // setReq(req_item);
    console.log("req....", req_item);
    setReq({
      RowNum: req_item.RowNum,
      department: req_item.department,
      educator_id: req_item.educator_id,
      id: req_item.id,
      requirement_text: req_item.requirement_text,
      subject: req_item.subject,
    });
    console.log("req",req);
  };

  React.useEffect(() => {
    axios
      .get(backendURL + "/CurriculumDeveloper/getAllEducatorRequirements")
      .then((res) => {
        setRows(res.data.requirements);
        console.log(rows);
      });
    // setRows(arr);
  }, []);

  return (
    <>
      <Grid align="center" sx={{ m: 5 }}>
        <Typography component="h1" variant="h2" align="center">
          List of Requirements by Educators
        </Typography>
      </Grid>

      <Box sx={{ height: 400, width: "96%", margin: "2%" }}>
        {/* {selectedHeads.length ? (
          <Grid container spacing={2}>
            <Grid item>
              <Button
                variant="contained"
                // onClick={() => {
                //   handleClickDelete(selectedHeads);
                // }}
                // sx={{ backgroundColor: "green" }}
              >
                Delete Heads
                <DeleteIcon />
              </Button>
            </Grid>
          </Grid>
        ) : (
          <> </>
        )} */}
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          // getRowId= {(row) => row.code}
          //   onRowSelectionModelChange={(newRowSelectionModel) => {
          //     setSelectedHeads(newRowSelectionModel);
          //   }}
          //   rowSelectionModel={selectedHeads}
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

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle variant="h3" align="center">Requirement</DialogTitle>
        <DialogContent>
        <Typography fontSize={18} gutterBottom sx={{ mb: 2 }}>
            <strong>Educator Id : </strong> {req.educator_id}
          </Typography>
        <Typography fontSize={18} gutterBottom sx={{ mb: 2 }}>
            <strong>Requirement Id : </strong> {req.id}
          </Typography>
        <Typography fontSize={18} gutterBottom sx={{ mb: 2 }}>
            <strong>Department : </strong> {req.department}
          </Typography>
          <Typography fontSize={18} component="div" sx={{ mb: 2 }}>
            <strong>Subject : </strong>
            {req.subject}
          </Typography>
          <Typography fontSize={18} sx={{ mb: 1.5 }}>
            <strong>Suggested Requirement : </strong>
            <p>{req.requirement_text}</p>
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
