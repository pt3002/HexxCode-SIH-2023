import React from "react";
import { Typography, Button, Grid, TextField, Box, TableCell } from "@mui/material";
import Swal from "sweetalert2";
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
import Label from "../../../components/Label";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";

const getStatus = (status) => {
  const map = {
    "A": {
      text: "Approved",
      color: "success",
    },
    "R": {
      text: "Rejected",
      color: "error",
    },
    H : {
      text: "Pending",
      color: "black",
    },
  };

  const { text, color } = map[status];

  return <Label color={color}>{text}</Label>;
};

export default function ApproveCurriculumDevelopers() {
  const [open, setOpen] = React.useState(false);
  const [approveFlag, setapproveFlag] = React.useState(2); //2-neither 1-aprove 0-reject
  const [rows, setRows] = useState([]);
  const [cd, setCD] = useState({
        id: "",
        status: "",
        name: "",
  })
  
  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 10,
    },
    {
      field: "name",
      headerName: "Name",
      width: 110,
    },
    {
      field: "email",
      headerName: "Email",
      width: 140,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 60,
    },
    {
      field: "university",
      headerName: "University",
      width: 110,
    },
    {
      field: "college",
      headerName: "College",
      width: 110,
    },
    {
      field: "resume_file_id",
      headerName: "Resume",
      width: 110
    },
    {
      field: "status",
      headerName: "Status",
      width: 110,
      renderCell: (params) => getStatus(params.row.status),
      
    },
    {
      field: "Action",
      headerName: "Action",
      type: "actions",
      width: 200,
      renderCell: (params) => (
        params.row.status === "H" ? (
          <Box>
              <DoneOutlineIcon onClick={() => {handleClickApprove(params,"A")}} style={{ color: "green" , margin: "2%" }} />
              <CancelIcon onClick={() => {handleClickApprove(params,"R")}} style={{ color: "red" }}  />
          </Box>
        ) : (

            params.row.status==="A" ?
            (
                <Button>
              <CancelIcon onClick={() => {handleClickApprove(params,"R")}} style={{ color: "red" }} />
            </Button>
            ) :
            (
                <Button>
              <DoneOutlineIcon onClick={() => {handleClickApprove(params,"A")}} style={{ color: "green" }} />
            </Button>
            )
        )
      ),
    },
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickApprove = (params, approveORreject) => {
        console.log(params.row.id);
        let data = cd;
        data.id = params.row.id;
        data.status = approveORreject;
        data.name = params.row.name;

        if(approveORreject==='A') setapproveFlag(1);
        else if(approveORreject==='R') setapproveFlag(0);
        else if(approveORreject==='H') setapproveFlag(2);

        setCD(data);
        setOpen(true);
  };


  const finalhandleApprove = () => {
    console.log("Approving cd...");
    let body = {
        id : cd.id,
        status: cd.status,
    }

    axios.post(backendURL + "/AICTEAdmin/approveCD", body)
    .then((res) =>
    {
        // console.log("LMAOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO",res);
        if (res.data.message) {
            Swal.fire({
              icon: "success",
              title: "ACTION SUCCESSFUL",
            //   text: "ACTION SUCCESSFUL",
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
    })
    setOpen(false);
  }

  React.useEffect(() => {
    axios.get(backendURL + "/AICTEAdmin/getAvailableCDs").then((res) => {
      setRows(res.data.allCDs);
      console.log("resp");
      console.log("resres", res.data.allCDs);
    });
  }, []);
  return (
    <>
      <Box sx={{ height: "50%" }}>
      <Typography
                    variant="h3"
                    component="h3"
                    sx={{ margin:"2%" }}
                    gutterBottom> 
                    Approve Curriculum Developers
                    </Typography>
           
         
        <DataGrid
          sx={{margin:"2%"}}
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

      <Dialog open={open} onClose={handleClose}>
      {
                approveFlag===1 ?
                (
                    <DialogTitle>Approve Curriculum Developer {cd.name}</DialogTitle>
                ) :
                (
                    <DialogTitle>Reject Curriculum Developer {cd.name}</DialogTitle>
                )
            } 
        
        <DialogContent>
          
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
            {
                approveFlag===1 ?
                (
                    <Button onClick={() => {finalhandleApprove()}}>Approve</Button>
                ) :
                (
                    <Button onClick={() => {finalhandleApprove()}}>Reject</Button>
                )
            }
        </DialogActions>
      </Dialog>
    </>
  );
}
