import React from "react";
import { Typography, Button, Box, IconButton } from "@mui/material";
import Swal from "sweetalert2";
import axios from "axios";
import { useState } from "react";
import { backendURL } from "../../../configKeys";
import DocViewer from "../Components/DocViewer";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Label from "../../../components/Label";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import CancelIcon from "@mui/icons-material/Cancel";
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

export default function ApproveCurriculum() {
  const [rows, setRows] = useState([]);
  const [curr, setCurr] = useState({
    id: "",
    status: "",
    name: "",
  });

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 110,
    },
    // {
    //   field: "email",
    //   headerName: "Email",
    //   width: 140,
    // },
    // {
    //   field: "gender",
    //   headerName: "Gender",
    //   width: 60,
    // },
    // {
    //   field: "university",
    //   headerName: "University",
    //   width: 110,
    // },
    // {
    //   field: "college",
    //   headerName: "College",
    //   width: 110,
    // },
    {
      field: "department",
      headerName: "Department",
      width: 110,
    },
    {
      field: "mongo_file_id",
      headerName: "Resume",
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {params.row.mongo_file_id ? (
              <IconButton>
                <DocViewer
                  filename={params.row.mongo_file_id}
                  contentType="application/pdf"
                />
              </IconButton>
            ) : (
              <>{"NA"}</>
            )}
          </>
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
      width: 150,
      renderCell: (params) => (
        <>
          {params.row.status === "P" ? (
            <>
              <IconButton
                variant="text"
                onClick={() => {
                  handleClickStatus(params, "A");
                }}
                style={{ color: "green" }}
              >
                <DoneOutlineIcon fontSize="small" />
              </IconButton>

              <IconButton
                onClick={() => {
                  handleClickStatus(params, "R");
                }}
                style={{ color: "red" }}
              >
                <CancelIcon fontSize="small" />
              </IconButton>
            </>
          ) : params.row.status === "A" ? (
            <IconButton
              onClick={() => {
                handleClickStatus(params, "R");
              }}
              style={{ color: "red" }}
            >
              <CancelIcon fontSize="small" />
            </IconButton>
          ) : (
            <IconButton
              onClick={() => {
                handleClickStatus(params, "A");
              }}
              style={{ color: "green" }}
            >
              <DoneOutlineIcon fontSize="small" />
            </IconButton>
          )}
          <IconButton
            onClick={() => {
              handleClickDelete(params);
            }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </>
      ),
    },
  ];

  const handleClickStatus = (params, newStatus) => {
    console.log(params.row.id);
    let data = curr;
    data.id = params.row.id;
    data.status = newStatus;
    data.name = params.row.name;
  
    var text = "";
  
    if (newStatus === "A") {
      text = "Approve";
    } else if (newStatus === "R") {
      text = "Reject";
    }
  
    Swal.fire({
      icon: "warning",
      title: "WARNING",
      input: "text",
      inputLabel: `Enter message to ${text} ${params.row.name}`,
      inputPlaceholder: "Message",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        // Set the message in the data object
        data.message = result.value;
        setCurr(data);

        finalhandleStatus();
      }
    });
  };
  

  const finalhandleStatus = () => {
    let body = {
      id: curr.id,
      status: curr.status,
      message: curr.message
    };

    axios.post(backendURL + "/AICTEAdmin/changeCurriculumStatus", body).then((res) => {
      if (res.data.message) {
        Swal.fire({
          icon: "success",
          title: "SUCCESS",
          text: "Curriculum Approved!",
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

  const handleClickDelete = (params) => {
    Swal.fire({
      icon: "warning",
      title: "WARNING",
      text: `Are you sure, do you want to delete curriculum of ${params.row.department}?`,
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        let body = { id: params.id };
        axios.post(backendURL + "/AICTEAdmin/deleteCurriculum", body).then((res) => {
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
    axios.get(backendURL + "/AICTEAdmin/getAvailableCurriculums").then((res) => {
      setRows(res.data.allCurriculums);
      console.log("resp");
      console.log("resres", res.data.allCurriculums);
    });
  }, []);
  return (
    <>
      <Box sx={{ height: "50%" }}>
        <Typography
          variant="h3"
          component="h3"
          sx={{ margin: "2%" }}
          gutterBottom
        >
          Approve Curriculum
        </Typography>

        <DataGrid
          sx={{ margin: "2%" }}
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
  );
}