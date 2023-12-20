import { Typography, Button, Grid, TextField, Box } from "@mui/material";
import Swal from "sweetalert2";
import * as React from "react";
import axios from "axios";
import { useState } from "react";
import Label from "../../../components/Label";
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
const getStatus = (status) => {
    const map = {
      A: {
        text: "Approved",
        color: "success",
      },
      R: {
        text: "Rejected",
        color: "error",
      },
      P: {
        text: "Pending",
        color: "warning",
      },
    };
  
    const { text, color } = map[status];
  
    return <Label color={color}>{text}</Label>;
  };
const uuid = require("uuid").v4;
export default function ViewDraftStatus() {
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = useState(0);
  const [rows, setRows] = useState([]);
  const [fileData, setfileData] = useState();
  const [guidelineId, setguidelineId] = useState([]);
  const [newGuideline, setNewGuideline] = useState({
    title: "",
    description: "",
    mongo_file_id: "",
  });

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
        <Box>
          <Button
            onClick={() => {
              handleClickDelete(params);
            }}
          >
            <DeleteIcon />
          </Button>
        </Box>
      ),
    },
    {
        field: "message",
        headerName: "Message from AICTE",
        width: 150,
      },
  ];

  function fileUpload(event) {
    if (event.target.files[0].type != "application/pdf") {
      alert("Please upload PDF file");
      return;
    } else {
      let data = new FormData();
      data.append("file", event.target.files[0], event.target.files[0].name);
      console.log("Guidelines event", event)
      setfileData(data);
    }
  }

  const handleClickOpen = () => {
    setEdit(0);
    setNewGuideline({
      title: "",
      description: "",
      mongo_file_id: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(newDepartmentHead);
    setOpen(false);
  };

  const handleAddGuideline = () => {
    if (fileData) {
      let URL = backendURL + "/File/upload";
      axios.post(URL, fileData).then(function (response) {
        if (response && response.data && response.data.filename) {
          // console.log(response.data.filename);
          let data = newGuideline;
          data.mongo_file_id = response.data.filename;
          setNewGuideline(data);

          let body = {
            id: uuid(),
            title: newGuideline.title,
            description: newGuideline.description,
            mongo_file_id: response.data.filename,
          };

          axios
            .post(backendURL + "/deptHead/addCurriculum", body)
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
        }
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "ERROR",
        text: `Please upload a file`,
        showConfirmButton: false,
        timer: 3000,
      });
    }

    setOpen(false);
  };

  const handleClickEdit = (params) => {
    setEdit(1);
    setOpen(true);
    let data = newGuideline;
    data["title"] = params.row.title;
    data["mongo_file_id"] = params.row.mongo_file_id;
    setguidelineId(params.id);
    setNewGuideline(data);
  };

  const handleClickDelete = (params) => {
    Swal.fire({
      icon: "warning",
      title: "WARNING",
      text: `Are you sure, do you want to delete this guideline?`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        let body = { id: params.id };
        axios
          .post(backendURL + "/deptHead/deleteCurriculum", body)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "SUCCESS",
              text: res.data.message,
              showConfirmButton: false,
              timer: 1500,
            }).then((confirm) => {
              if (confirm) {
                window.location.reload();
              }
            });
          });
      }
    });
  };

  React.useEffect(() => {
    axios.get(backendURL + "/deptHead/getAvailableCurriculums").then((res) => {
      setRows(res.data.guidelines);
    });
  }, []);

  return (
    <>
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
        Add New Curriculum
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          {Edit ? "EDIT CURRICULUM" : "ADD NEW CURRICULUM"}
        </DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="title"
            label="Title"
            type="text"
            fullWidth
            variant="standard"
            value={newGuideline.title}
            onChange={(e) => {
              setNewGuideline({
                ...newGuideline,
                title: e.target.value,
              });
            }}
          />

          {/* <TextField
            autoFocus
            margin="dense"
            id="description"
            value={newGuideline.description}
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              setNewGuideline({
                ...newGuideline,
                description: e.target.value,
              });
            }}
          /> */}

          <Grid container spacing={3}>
            <Grid sm item>
              <Button fullWidth variant="outlined">
                <input
                  type="file"
                  accept={".pdf"}
                  onChange={(event) => fileUpload(event)}
                  // style={{ color: "transparent" }}
                />
              </Button>
            </Grid>
            <Grid sm item></Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleAddGuideline}>Add</Button>
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
    </>
    // <>
    //   <Typography>Guidelines Page</Typography>
    //   <Grid container spacing={3}>
    //     <Grid sm item>
    //       <Button fullWidth variant="outlined">
    //         <input
    //           type="file"
    //           onChange={(event) => fileUpload(event)}
    //           style={{ color: "transparent" }}
    //         />
    //         Choose File
    //       </Button>
    //     </Grid>
    //     <Grid sm item></Grid>
    //   </Grid>
    //   <Typography>View File</Typography>

    //   {/* filename to be passed here as props now passing hard coded filename stored at index 0 in mongo - 62d0981f9cbf63f99a6e6ea7a677aa861702125661214.pdf */}
    //   <DocViewer filename={"62d0981f9cbf63f99a6e6ea7a677aa861702125661214.pdf"} contentType="application/pdf" />
    // </>
  );
}
