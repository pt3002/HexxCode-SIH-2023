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

const columns = [
  { field: "id", headerName: "ID", width: 90 },

  {
    field: "Name",
    headerName: "Name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "email",
    width: 150,
    editable: true,
  },
  {
    field: "college",
    headerName: "college",
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

const rows = [
  {
    id: 1,
    Name: "Jon",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "5-5-5",
    last_login_date: "",
  },
  {
    id: 2,
    Name: "Cersei",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "12-12-12",
    last_login_date: "",
  },
  {
    id: 3,
    lastName: "Lannister",
    Name: "Jaime",
    college: "SPPU",
    department: "CS",
    creation_date: "10-10-10",
    last_login_date: "",
  },
  {
    id: 4,
    Name: "Arya",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "4-4-4",
    last_login_date: "",
  },
  {
    id: 5,
    Name: "Daenerys",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "12-12-12",
    last_login_date: "",
  },
  {
    id: 6,
    Name: "Sheldon",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "11-11-11",
    last_login_date: "",
  },
  {
    id: 7,
    Name: "Ferrara",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "9-9-9",
    last_login_date: "",
  },
  {
    id: 8,
    Name: "Rossini",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "7-7-7",
    last_login_date: "",
  },
  {
    id: 9,
    Name: "Harvey",
    email: "demo@gmail.com",
    college: "SPPU",
    department: "CS",
    creation_date: "5-5-5",
    last_login_date: "",
  },
];

export default function AddDepartment() {
  const [open, setOpen] = React.useState(false);
  const [newDepartmentHead, setNewDepartmentHead] = useState({
    deptHead_id: "",
    deptHead_lastname: "",
    deptHead_email: "",
    deptHead_college: "",
    deptHead_creationDate: "",
    deptHead_lastlogin: "",
  });

  const handleClickOpen = () => {
    setNewDepartmentHead({
      deptHead_id: "",
      deptHead_lastname: "",
      deptHead_email: "",
      deptHead_college: "",
      deptHead_creationDate: "",
      deptHead_lastlogin: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    console.log(newDepartmentHead);
    setOpen(false);
  };
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
                pcollegeSize: 5,
              },
            },
          }}
          pcollegeSizeOptions={[5]}
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
            type="email"
            fullWidth
            variant="standard"
            value={newDepartmentHead.deptHead_firstname}
            onChange={(e) => {
              setNewDepartmentHead({
                ...newDepartmentHead,
                deptHead_firstname: e.target.value,
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
          />
          <TextField
            autoFocus
            margin="dense"
            id="designation"
            label="Designation"
            type="text"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            margin="dense"
            id="department"
            label="Department"
            type="text"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
