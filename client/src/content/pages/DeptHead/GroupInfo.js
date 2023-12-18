import React from "react";
import { useLocation } from "react-router-dom";
import {
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Typography,
  Avatar,
  alpha,
  Tooltip,
  CardActionArea,
  styled,
  TextField,
  Popover,
  Paper,
} from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAddAlt1";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";
import { backendURL } from "../../../configKeys";
import Swal from "sweetalert2";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useContext, useEffect } from "react";
import UserTokenContext from "../../../contexts/UserTokenContext";

export default function GroupInfo() {
  //Note: We can use location.state.group_id to display CDs subject wise
  const DeptHeadContext = useContext(UserTokenContext);
  const {dict, checkToken} = DeptHeadContext;
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const [rows, setRows] = useState([]);
  const [selectedCDs, setselectedCDs] = useState([]);
  const [selectedCDsforDeletion, setselectedCDsforDeletion] = useState([]);
  const [membersData, setMembersData] = useState([]);

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
      width: 180,
      editable: true,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
      editable: true,
    },
    {
      field: "university",
      headerName: "University",
      width: 110,
      editable: true,
    },
    {
      field: "college",
      headerName: "College",
      width: 110,
      editable: true,
    },
  ];

  const viewMemColumns = [
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
      field: "gender",
      headerName: "Gender",
      width: 150,
      editable: true,
    },
    {
      field: "university",
      headerName: "University",
      width: 110,
      editable: true,
    },
    {
      field: "college",
      headerName: "College",
      width: 110,
      editable: true,
    },
    // {
    //   field: "Action",
    //   headerName: "ACTION",
    //   // width: 110,
    //   renderCell: (params) => (
    //     <Button>
    //       <RemoveCircleOutlineIcon
    //         onClick={() => {
    //           setselectedCDsforDeletion(params.id);
    //           handleDeleteMembers();
    //         }}
    //       />
    //     </Button>
    //   ),
    // },
  ];
  React.useEffect(() => {
    checkToken();
  }, []);
  const handleClickOpen = () => {
    axios.get(backendURL + "/DeptHead/getMembersNotInAnyGroup", {
      headers: {
        "shiksha-niyojak": dict.token
      }
    }).then((res) => {
      setRows(res.data.members);
      setOpen(true);
    });
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleAddMembers = () => {
    let body = { ids: selectedCDs, group_id: location.state.group_id };
    setOpen(false);
    axios.post(backendURL + "/DeptHead/addMembersToGroup", body, {
      headers: {
        "shiksha-niyojak": dict.token
      }
    }).then((res) => {
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
  };

  const handleDeleteMembers = () => {
    let body = {
      ids: selectedCDsforDeletion,
      group_id: location.state.group_id,
    };
    setOpen(false);
    axios
      .post(backendURL + "/DeptHead/deleteMembersFromGroup", body, {
        headers: {
          "shiksha-niyojak": dict.token
        }
      })
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
  };

  React.useEffect(() => {
    if(dict.token){
      let body = { group_id: location.state.group_id };
      axios.post(backendURL + "/DeptHead/viewGroupMembers", body, {
        headers: {
          "shiksha-niyojak": dict.token
        }
      }).then((res) => {
        setMembersData(res.data.members);
      });
    }
  }, [dict.token]);

  return (
    <div>
      <Grid align="center" sx={{ margin: "2%" }}>
        <Typography component="h1" variant="h2" align="left" sx={{ margin: "1%" }} >
          Group for {location.state.subject_name}
        </Typography>
        <Grid style={{display:'flex', flexDirection:'row'}}>
          <Button
            variant="contained"
            sx={{ margin: "1%" }}
            size="large"
            onClick={() => {
              handleClickOpen();
            }}
            startIcon={<PersonAddIcon />}
          >
            Add Members to Group
          </Button>
          <Button
            variant="contained"
            sx={{ margin: "1%" }}
            size="large"
            onClick={handleDeleteMembers}
            style={{
              display: selectedCDsforDeletion.length ? "block" : "none",
            }}
            // startIcon={<RemoveCircleOutlineIcon/>}
          >
            Delete selected members
          </Button>
        </Grid>
      </Grid>

      <Dialog fullScreen open={open} onClose={handleClose}>
        <DialogTitle>ADD CURRICULUM DEVELOPERS</DialogTitle>
        <DialogContent>
          <DataGrid
            slots={{ toolbar: GridToolbar }}
            rows={rows}
            columns={columns}
            onRowSelectionModelChange={(newRowSelectionModel) => {
              setselectedCDs(newRowSelectionModel);
            }}
            rowSelectionModel={selectedCDs}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {selectedCDs.length ? (
            <Button onClick={handleAddMembers}>Add</Button>
          ) : (
            <></>
          )}
        </DialogActions>
      </Dialog>

      <DataGrid
        slots={{ toolbar: GridToolbar }}
        rows={membersData}
        columns={viewMemColumns}
        onRowSelectionModelChange={(newRowSelectionModel) => {
          setselectedCDsforDeletion(newRowSelectionModel);
        }}
        rowSelectionModel={selectedCDsforDeletion}
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
        sx={{ marginLeft: "2%" }}
      />
    </div>
  );
}
