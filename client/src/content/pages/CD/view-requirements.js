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
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';

import { backendURL } from "../../../configKeys";
import { fDate } from "../../../utils/formatTime";
import axios from "axios";
import Swal from "sweetalert2";
const uuid = require("uuid").v4;

const arr = [
  {
    id: "123",
    branch: "comp",
    date: "12/02.13",
    requirements: "sjszjcjuxcbjscbxxh b",
  },
  {
    id: "456",
    branch: "comp",
    date: "14/02.13",
    requirements: "sjszjcjuxcbjscbxxh b",
  },
  {
    id: "789",
    branch: "comp",
    date: "12/02.13",
    requirements: "sjszjcjuxcbjscbxxh b",
  },
];
export default function ViewRequirements() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [id, setId] = useState(0);
  const [req, setReq] = useState("");

  const columns = [
    {
      field: "serial",
      headerName: "Sr No",
      width: 200,
      editable: true,
    },
    {
      field: "id",
      headerName: "Educator ID",
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
      width: 200,
      renderCell: (params) => (
        <>
          <Button
            variant="contained"
            size="small"
            // onClick={() => {
            //   handleClickOpen();
            //   setId("123");
            //   const req = findReqById(id);
            //   console.log(req.requirements);
            //   setReq(req.requirements);
            // }}
          >
            View
          </Button>
        </>
      ),
    },
  ];

  const findReqById = (id) => {
    const findReq = arr.find((item) => item.id === id);
    return findReq;
  };

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  React.useEffect(() => {
    axios.get(backendURL + "/CurriculumDeveloper/getAllEducatorRequirements").then((res) => {
      setRows(res.data.requirements);
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
        <DialogTitle>Requirement by {id}</DialogTitle>
        <DialogContent>
          {req}
        </DialogContent>
      </Dialog>
    </>
  );
}
