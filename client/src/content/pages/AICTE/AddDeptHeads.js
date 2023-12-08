import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import Swal from "sweetalert2";
const uuid = require("uuid").v4;
const columns = [
  {
    field: "name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 150,
    editable: true,
  },
  {
    field: "college",
    headerName: "College",
    width: 110,
    editable: true,
  },
  {
    field: "department",
    headerName: "Department",
    width: 110,
    editable: true,
  },
  {
    field: "designation",
    headerName: "Designation",
    width: 110,
    editable: true,
  },
  {
    field: "creation_date",
    headerName: "Creation date",
    width: 110,
    editable: true,
  },
  {
    field: "last_login",
    headerName: "Last Login",
    width: 110,
    editable: true,
  },
];

export default function AddDepartmentHeads() {
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [newDepartmentHead, setNewDepartmentHead] = useState({
    deptHead_id: "",
    deptHead_name: "",
    deptHead_email: "",
    deptHead_college: "",
    deptHead_department: "",
    deptHead_designation: "",
    deptHead_creationDate: "",
    deptHead_lastlogin: "",
  });

  const handleClickOpen = () => {
    setNewDepartmentHead({
      deptHead_id: "",
      deptHead_name: "",
      deptHead_email: "",
      deptHead_college: "",
      deptHead_department: "",
      deptHead_designation: "",
      deptHead_creationDate: "",
      deptHead_lastlogin: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(newDepartmentHead);
    setOpen(false);
  };

  const handleAddDepartmentHead = () => {
    let body = {
      id: uuid(),
      email: newDepartmentHead.deptHead_email,
      password: Math.random().toString(36).substring(2, 7),
      name: newDepartmentHead.deptHead_name,
      department: newDepartmentHead.deptHead_department,
      college: newDepartmentHead.deptHead_college,
      designation: newDepartmentHead.deptHead_designation,
    };

    axios
      .post(backendURL + "/AICTEAdmin/addDepartmentHead", body)
      .then((res) => {
        if (res.data.message) {
          Swal.fire({
            icon: "success",
            title: "SUCCESS",
            text: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          }).then((confirm) => {
            if (confirm) {
              window.location.reload();
            }
          });
        } else if (res.data.error) {
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: res.data.error,
            showConfirmButton: false,
            timer: 3000,
          });
        }
      });
    console.log(newDepartmentHead);
    setOpen(false);
  };

  React.useEffect(() => {
    axios.get(backendURL + "/AICTEAdmin/getAllDepartmentHeads").then((res) => {
      console.log(res.data.heads);
      setRows(res.data.heads);
    });
  }, []);
  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: "2%" }}
        size="large"
        onClick={handleClickOpen}
        startIcon={<AddCircleSharpIcon />}
      >
        Add New Department Head
      </Button>

      <Box sx={{ height: 400, width: "96%", margin: "2%" }}>
        <DataGrid
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
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>ADD NEW DEPARTMENT HEAD</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}

          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            value={newDepartmentHead.deptHead_name}
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_name: e.target.value,
              });
            }}
          />

          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Email id"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_email: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="college"
            label="College"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_college: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="designation"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_designation: e.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="department"
            label="Department"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_department: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleAddDepartmentHead}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
