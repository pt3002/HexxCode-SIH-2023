import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
  GridRowModes,
  DataGrid,
  GridToolbarContainer,
  GridActionsCellItem,
  GridRowEditStopReasons,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomId,
  randomArrayItem,
} from '@mui/x-data-grid-generator';
import { Grid, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import UserTokenContext from '../../../contexts/UserTokenContext';
import { backendURL } from '../../../configKeys';
import { useContext } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from "react-router";


const uuid = require("uuid").v4

const type = ["Core", "Departmental Elective", "Non Departmental Elective"];
// const randomRole = () => {
//   return randomArrayItem(roles);
// };

const initialRows = [
  {
    id: "1234",
    subject_code : "ME1201",
    name : "PSE",
    learning : 4,
    tutorial : 5,
    practical : 5,
    credits : 10,
    type : "Core"
  },
];

function EditToolbar(props) {
  const { setRows, setRowModesModel } = props;

  const handleClick = () => {
    const id = uuid();
    setRows((oldRows) => [...oldRows, { id : id, subject_code : '' , name: '',learning : 0, tutorial : 0, practical : 0, credits : 0, isNew: true }]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: 'subject_code' },
    }));
  };

  return (
    <GridToolbarContainer>
        <Grid container justify-content = "center" alignItem = "center">
        <Button color="primary" startIcon={<AddIcon />} onClick={handleClick} variant = "contained" sx = {{m : 3}}>
        Add Course
      </Button>
        </Grid>
      
    </GridToolbarContainer>
  );
}

export default function BuildCurriculum() {
  const navigate = useNavigate();
  const [rows, setRows] = React.useState([]);
  const [rowModesModel, setRowModesModel] = React.useState({});
  const [documents, setDocuments] = React.useState([])
  const userContext = useContext(UserTokenContext)
  const {dict, checkToken} = userContext

  const handleSaveAll = () => {
    let subjects=rows;
    for(let i=0;i<subjects.length;i++){
      subjects[i]["department"]="Computer Engineering";
      subjects[i]["semester"]="1";
      if(subjects[i]["subject_id"]){
        continue;
      }
      else{
        subjects[i]["subject_id"]=uuid();
      }
    }
    let body = {
      subjects : subjects
    }
    console.log("hjdbubfdsybgf:",body);
    axios.post(backendURL + "/curriculumDeveloper/updateSubjects", body).then((res) => {
      if(res.data.message == "Updated"){
        Swal.fire({
          icon : "success",
          text : "SUCCESS",
          timer : 1500
        }).then((confirm) => {
          if(confirm){
            window.location.reload()
          }
        })
        
  }
})
}

  React.useEffect(() => {
    // check if document by subject name exists else create new
    if(dict){
        checkToken()
        axios.get(backendURL + "/curriculumDeveloper/getDocuments", {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        }).then((res) => {
          if(res.status == 200){
            console.log(res.data.complete)
              setDocuments(res.data.complete)
          }
      })
      let body = {
        "semester" : 1
      }
      axios.post(backendURL + "/curriculumDeveloper/getSemesterSubjects", body).then((res) => {
        let subjects = res.data.subjects
        for(let i = 0; i <subjects.length; i++){
          subjects[i]["id"] = subjects[i]["subject_id"]
        }
        setRows(subjects)
      })
      }
  }, [])

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

  const columns = [
    { field: 'subject_code', headerName: 'Course Code', width: 120, editable: true },
    {
      field: 'name',
      headerName: 'Course Name',
      width: 120,
      editable: true,
    },
    {
      field: 'learning',
      headerName: 'Lectures',
      type: 'number',
      width: 80,
      align : "left",
      headerAlign : "left",
      editable: true,
    },
    {
        field: 'tutorial',
        headerName: 'Tutorials',
        type: 'number',
        width: 80,
        align : "left",
      headerAlign : "left",
        editable: true,
    },
    {
        field: 'practical',
        headerName: 'Practicals',
        type: 'number',
        width: 80,
        align : "left",
      headerAlign : "left",
        editable: true,
    },
    {
        field: 'credits',
        headerName: 'Credits',
        type: 'number',
        width: 80,
        align : "left",
      headerAlign : "left",
        editable: true,
    },
    {
        field: 'type',
        headerName : "Type",
        width : 220,
        editable : true,
        type: "singleSelect",
        valueOptions : type
    },
    {
      field: 'actions',
      type: 'actions',
      headerName: 'Actions',
      width: 150,
      cellClassName: 'actions',
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: 'primary.main',
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
        field:"view",
        headerName : "HyperLink",
        editable : false,
        type: "actions",
        width : 100,
        align : "left",
        headerAlign : "left",
        cellClassName : "hyperlink",
        getActions : ({id}) => {

            return[
                <GridActionsCellItem
                icon = {<VisibilityIcon />}
                label = "View"
                className='textPrimary'
                onClick={() => {navigate("/curriculumDeveloper/createDocument")}}
                color = "inherit"

                />
            ]

            
        }
    }
  ];

  return (
    <>
    <Grid container justifyContent="contained" alignItems="center">
        <Typography variant = "h3" sx = {{ml:3}}>
            Semester 1 Curriculum
        </Typography>
    </Grid>
    <Box
      sx={{
        m : 4,
        height: 600,
        width: '90%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
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
        <Button variant = "contained" onClick={handleSaveAll} sx = {{mx:3}}>
            Save 
        </Button>
        <Button variant = "contained" onClick={handleSaveAll}>
           Download Curriculum
        </Button>
    </Grid>
    </>
  );
}
