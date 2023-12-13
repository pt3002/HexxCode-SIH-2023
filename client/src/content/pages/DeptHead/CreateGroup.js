import React from "react";
import { Typography, Button, Grid, TextField, Box } from "@mui/material";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fDate } from "../../../utils/formatTime";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { backendURL } from "../../../configKeys";
import axios from "axios";
import Swal from "sweetalert2";

const uuid = require("uuid").v4;

export const CreateGroup = () => {
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = useState(0);
  const [rows, setRows] = useState([]);
  const [newGroup, setNewGroup] = useState({
    department: "CSE",
    subject_name: "",
  });

  const columns = [
    {
      field: "subject_name",
      headerName: "Subject Name",
      width: 200,
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
      field: "Action",
      headerName: "Action",
      type: "actions",
      width: 200,
      renderCell: (params) => (
        <Box>
          <Button
            onClick={() => {
            //   handleClickEdit(params);
            }}
          >
            <EditIcon />
          </Button>

          <Button
            onClick={() => {
            //   handleClickDelete(params);
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
  ];

  const handleClickOpen = () => {
    setEdit(0);
    setNewGroup({
        ...newGroup,
      subject_name: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(newDepartmentHead);
    setOpen(false);
  };

  const handleAddGroup = () => {
    let body = {
      id: uuid(),
      department: newGroup.department,
      subject_name: newGroup.subject_name
    };

    axios
      .post(backendURL + "/DeptHead/addGroup", body)
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

    setOpen(false);
  };

  React.useEffect(() => {
    let body = { department: newGroup.department}
    axios.post(backendURL + "/DeptHead/getAllSubjectNamesByDepartment",body).then((res) => {
        console.log(res.data)
      setRows(res.data.subjects);
    });
  }, []);
  return (
    <div>
      <Button
        variant="contained"
        sx={{ margin: "2%" }}
        size="large"
        onClick={() => {
          // setEdit(0);
            handleClickOpen();
        }}
        startIcon={<AddCircleSharpIcon />}
      >
        Create New Group
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {Edit ? "EDIT GROUP" : "ADD NEW GROUP"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="subject_name"
            label="Subject Name"
            type="text"
            fullWidth
            variant="standard"
            value={newGroup.subject_name}
            onChange={(e) => {
              setNewGroup({
                ...newGroup,
                subject_name: e.target.value,
              });
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {Edit ? (
            <Button onClick={()=>{}}>Edit</Button>
          ) : (
            <Button onClick={handleAddGroup}>Add</Button>
          )}
        </DialogActions>
      </Dialog>

      <Box sx={{ height: 400, width: "96%", margin: "2%" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          // onRowSelectionModelChange={(newRowSelectionModel) => {
          //   setSelectedHeads(newRowSelectionModel);
          // }}
          // rowSelectionModel={selectedHeads}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          // checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
};
