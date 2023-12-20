import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import ReactHtmlParser from 'react-html-parser';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from "@mui/x-data-grid";
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from "@mui/x-data-grid-generator";
import { Grid, Typography } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import UserTokenContext from "../../../contexts/UserTokenContext";
import { backendURL } from "../../../configKeys";
import { useContext , useEffect, useRef} from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import html2canvas from "html2canvas"
import jsPDF from 'jspdf'

const uuid = require("uuid").v4;

const type = ["Core", "Departmental Elective", "Non Departmental Elective"];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const initialRows = [
  {
    id: "1234",
    subject_code: "ME1201",
    name: "PSE",
    learning: 4,
    tutorial: 5,
    practical: 5,
    credits: 10,
    type: "Core",
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuid();
    setRows((oldRows) => [
      ...oldRows,
      {
        id: id,
        subject_code: "",
        name: "",
        learning: 0,
        tutorial: 0,
        practical: 0,
        credits: 0,
        isNew: true,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "subject_code" },
    }));
  };

  return (
    <GridToolbarContainer>
      <Grid container justify-content="center" alignItem="center">
        <Button
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleClick}
          variant="contained"
          sx={{ m: 3 }}>
          Add Course
        </Button>
      </Grid>
    </GridToolbarContainer>
  );
}

export default function EditableBuildCurriculum() {
  const pdfRef = useRef()
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [documents, setDocuments] = React.useState([]);
  const [html, setHtml] = React.useState([])
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  //   const userContext = useContext(UserTokenContext);
  //   const { dict, checkToken } = userContext;

  const handleSaveAll = () => {
    let subjects = rows;
    for (let i = 0; i < subjects.length; i++) {
      subjects[i]["department"] = "Computer Engineering";
      subjects[i]["semester"] = "1";
      if (subjects[i]["subject_id"]) {
        continue;
      } else {
        subjects[i]["subject_id"] = uuid();
      }
    }
    let body = {
      subjects: subjects,
    };
    console.log("hjdbubfdsybgf:", body);
    axios
      .post(backendURL + "/curriculumDeveloper/updateSubjects", body)
      .then((res) => {
        if (res.data.message == "Updated") {
          Swal.fire({
            icon: "success",
            text: "SUCCESS",
            timer: 1500,
          }).then((confirm) => {
            if (confirm) {
              window.location.reload();
            }
          });
        }
      });
  };

  React.useEffect(() => {
    // check if document by subject name exists else create new
    // if (dict) {
    //   checkToken();
    // axios
    //   .get(backendURL + "/curriculumDeveloper/getDocuments", {
    //     headers: {
    //       "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
    //     },
    //   })
    axios.get(backendURL + "/curriculumDeveloper/getDocuments").then((res) => {
      if (res.status == 200) {
        console.log(res.data.complete);
        setDocuments(res.data.complete);
      }
    });
    let body = {
      semester: 1,
    };
    axios
      .post(backendURL + "/curriculumDeveloper/getSemesterSubjects", body)
      .then((res) => {
        let subjects = res.data.subjects;
        for (let i = 0; i < subjects.length; i++) {
          subjects[i]["id"] = subjects[i]["subject_id"];
        }
        setRows(subjects);
      });
  }, []);
  // }, []);

  // React.useEffect(async() => {
  //   let a = [
  //     "Learning Outcomes",
  //     "Modules",
  //     "Assessment Details",
  //     "Resources",
  //     "Suggested Videos",
  //   ];
  //   console.log(dict)
  //   if(dict && dict.details && dict.details.id){
  //     console.log(rows)
  //       for (let i = 0; i < a.length; i++) {
  //         let body = {
  //           title: a[i],
  //           description: "Initial Commits",
  //           createdBy: dict.details.id,
  //         };
  //         await axios.post(
  //           backendURL + "/curriculumDeveloper/createDocument",
  //           body,
  //           {
  //             headers: {
  //               "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
  //             },
  //           }
  //         ).then((res) => {
  //           console.log(res)
  //         })
  //       }

  //   }

  // } , [documents, rows])

  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    setRows(rows.filter((row) => row.id !== id));
    let body = {
      subject_id: id,
    };
    // console.log("dsefd", body);
    axios.post(backendURL + "/curriculumDeveloper/deleteSubjects", body);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  useEffect(async() => {
    let html = ""
      for(let i = 0 ;i < rows.length ; i++){
        let body = {
          "subjectName" : rows[i]["name"]
      }
      html += "<h1>" + "Subject Name : " + rows[i]["name"] + "</h1><p><br></p>"
        await axios.post(backendURL + "/curriculumDeveloper/getDocsSubjectWise", body).then(async(res) => {
          let all_docs = res.data
          for(let i = 0 ; i < all_docs.length ; i++){
              html += "<h3>" + all_docs[i]["title"] + "</h3><p><br></p>"
              await axios.get(backendURL + "/curriculumDeveloper/lastSaveBody/" + all_docs[i]["_id"], {
                  headers: {
                    "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
                  },
                }).then((resp) => {
                  if(resp.status == 200){
                      html += resp.data.body
                  }
                })
          }
          
      })
      }
        html = "<div>" + html + "</div>"
            setHtml(html)
}, [rows])

const downloadPDF = () => {
  const input = pdfRef.current; 
  html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4', true);
      const pdfWidth = pdf.internal.pageSize.getWidth()
      const pdfHeight = pdf.internal.pageSize.getHeight();
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth/imgWidth, pdfHeight/imgHeight);
      const imgX  = (pdfWidth - imgWidth*ratio)/2;
      const imgY = 30;
      pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth *ratio, imgHeight *ratio);
      pdf.save('complete.pdf');

  })

}
  const columns = [
    {
      field: "subject_code",
      headerName: "Course Code",
      width: 120,
      editable: true,
    },
    {
      field: "name",
      headerName: "Course Name",
      width: 220,
      editable: true,
    },
    {
      field: "learning",
      headerName: "Lectures",
      type: "number",
      width: 70,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "tutorial",
      headerName: "Tutorials",
      type: "number",
      width: 70,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "practical",
      headerName: "Practicals",
      type: "number",
      width: 70,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "credits",
      headerName: "Credits",
      type: "number",
      width: 70,
      align: "left",
      headerAlign: "left",
      editable: true,
    },
    {
      field: "type",
      headerName: "Type",
      width: 220,
      editable: true,
      type: "singleSelect",
      valueOptions: type,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 150,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
    {
      field: "view",
      headerName: "HyperLink",
      editable: false,
      type: "actions",
      width: 100,
      align: "left",
      headerAlign: "left",
      cellClassName: "hyperlink",
      getActions: ({ id }) => {
        return [
          <GridActionsCellItem
            icon={<VisibilityIcon />}
            label="View"
            className="textPrimary"
            onClick={() => {
              navigate("/deptHead/createDocument", {
                "state" : rows[id-1]["name"]
              });
            }}
            color="inherit"
          />,
        ];
      },
    },
  ];

  return (
    <>
      <Grid container justifyContent="contained" alignItems="center">
        <Typography variant="h3" sx={{ ml: 3 }}>
          Semester 1 Curriculum
        </Typography>
      </Grid>
      <Grid container justifyContent = "contained" alignItems="center">
        <Button variant = "contained" sx = {{m:3}} onClick={handleClickOpen}>
          View Complete Curriculum
        </Button>
      </Grid>
      <Box
        sx={{
          m: 4,
          height: 600,
          width: "90%",
          "& .actions": {
            color: "text.secondary",
          },
          "& .textPrimary": {
            color: "text.primary",
          },
        }}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          slots={{
            toolbar: EditToolbar,
          }}
          slotProps={{
            toolbar: { setRows, setRowModesModel },
          }}
        />
      </Box>
      <Grid container justifyContent="center" alignItems="center">
        <Button variant="contained" onClick={handleSaveAll} sx={{ mx: 3 }}>
          Save
        </Button>
        <Button variant="contained" onClick={handleSaveAll}>
          Download Curriculum
        </Button>
      </Grid>
      <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Viewing Complete Draft</DialogTitle>
        <DialogContent>
          <Box p={2}>
            <Grid item xs={12} sx={{ mt: 2 }}>
                <div ref = {pdfRef}>{ ReactHtmlParser (html) }</div>
            
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick = {downloadPDF}>
            Export As PDF
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
