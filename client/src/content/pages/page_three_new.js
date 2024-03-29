import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { nanoid } from "nanoid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import Footer from "../../components/Footer";
import bg_pic from "../../components/images/bg.jpg";
import profile_pic from "../../components/images/profile.webp";



import DocViewer from "./Components/DocViewer";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import RegisterReadExp from './Components/RegisterReadExp';
import RegisterReadQuali from './Components/RegisterReadQuali'
import { Fragment  } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { renderButton, renderInputSelect } from './Components/displayComponents';
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from 'react-router';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
  } from "@material-ui/core";
import { Search } from '@mui/icons-material';
import { useLocation } from 'react-router-dom';
import Swal from "sweetalert2";
import axios from "axios";
import { backendURL } from '../../configKeys';
const uuid = require("uuid").v4;

// import Page1 from './page_one'
// import Page2 from './page_two';
// import Page3 from './page_three'


const steps = ["Personal Information", "Other Details", "Upload Resume"];
// function getStepContent(step) {
//   switch (step) {
//     case 0:
//       return <Page1 />;
//     case 1:
//       return <Page2 />;
//     case 2:
//       return <Page3 />;
//     default:
//       throw new Error('Unknown step');
//   }
// }

export default function Page3New() {
  const location = useLocation();
  const [fileData, setfileData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = React.useState(0);
  const [newGuideline, setNewGuideline] = React.useState({
    mongo_file_id: "",
  });
  const columns = [
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
  ]
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  
  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () =>{
    setActiveStep(activeStep - 1);
    navigate("/register/page2")
  }
  const [stateVar, setStateVar] = React.useState({
    Data: {
    // college: '',
    // department: '',
    // university: '',
    // specializationDomain: '',
    mongo_file_id: "",
    // password: '',
    // confirmPassword: '',
  },
  errors:{}
});
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
function fileUpload(event) {
  if (event.target.files[0].type != "application/pdf") {
    alert("Please upload PDF file");
    return;
  } else {
    let data = new FormData();
    data.append("file", event.target.files[0], event.target.files[0].name);
    console.log("data...",data);
    console.log("File Upload:",event)
    console.log("beforefiledata...",fileData);
    setfileData(data);
    console.log("afterfiledata...",fileData);
  }
}
  // const handleChange = ({target}) => {
  //   let errors = { ...stateVar.errors };
  //   let Data = { ...stateVar.Data };
  //   Data[target.name] = target.value;
  //   console.log(target.name, target.value)
  //   setStateVar({ Data: Data, errors: errors });
    // const { name, value } = e.target;
    // //console.log(name, value)
    // setStateVar((prevData) => ({
    //   ...prevData,
    //   Data.name: value,
    // }));
  // };
  React.useEffect(() => {
    // Access the data passed from Page1New
    console.log("navigate location",location.state)
    const { dataFromPage2 } = location.state || {};
    if (dataFromPage2) {
      setStateVar((prevState) => ({
        ...prevState,
        Data: { ...prevState.Data, ...dataFromPage2 },
      }));
    } else {
      // Handle case where data is not available
    }
  }, [navigate.location]);
    const handleSubmit = () => {
        let { Data, errors } = stateVar;        

        // Object.keys(errors).map((error) => {
        //   if (errors[error] !== "") {
        //     validate = false;
        //   }
        // });
        // let validate = true;
        if (fileData) {
            console.log("All data is correctly filled", Data)
            let URL = backendURL + "/File/upload";
      axios.post(URL, fileData).then(function (response) {
        if (response && response.data && response.data.filename) {
          console.log("filename...",response.data.filename);
          let data = newGuideline;
          data.mongo_file_id = response.data.filename;
          setNewGuideline(data);
          // console.log(response.data.filename)

          let body = {id:uuid(), 
            email:Data.email, 
            name:Data.name, 
            contactNumber:Data.contactNumber, 
            mongo_file_id: response.data.filename,
            gender:Data.gender, 
            college:Data.college, 
            university:Data.university,
            password: Math.random().toString(36).substring(2, 7),

          
          };
            const initial_url = backendURL+"/CurriculumDeveloper/register";
      
            axios.post(initial_url, body).then(res => {
              if(res.data.message === "User with same email already registered"){
                Swal.fire({
                  icon: "error",
                  title: "ERROR",
                  text: res.data.message,
                  showConfirmButton: false,
                  timer: 3000,
                }).then(navigate("/register/page1"));
              }
              else{
                Swal.fire({
                  icon: "success",
                  title: "SUCCESS",
                  text: res.data.message,
                  showConfirmButton: false,
                  timer: 3000,
                }).then(navigate("/login"));
              }}).catch((error) => {
                console.log("Error Code: ", error);
                navigate("/login");
              });
        }}).catch((error) => {
          console.log("Error Code: ", error);
          // navigate("/register/page1");
        });
          handleNext();
          } else {
            console.log(errors)
            alert("Please fill all data first");
          }
    };





  return (
    <React.Fragment>
       <Box
  sx={{
    backgroundImage: `url(${bg_pic})`,
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    backgroundColor: '#767676',
  }}>
      <CssBaseline />
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, opacity:0.9 }}>
        <Grid
            container
            spacing={2}
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: { xs: 2, md: 2 },
            }}
          >
            <Avatar
                  sx={{ width: 60, height: 60, mr: 1 }}
                  alt="CD"
                  src={profile_pic}
                />
          </Grid>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontSize: '1.5rem', margin: '20px' }}
            >
            Curriculum Developer Registration
            </Typography>

          <Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Successfully Registered.
              </Typography>
              <Typography variant="subtitle1">
                To confirm your registration check the otp sent in your email.
              </Typography>
            </React.Fragment>
          ) : (
            <React.Fragment>
      <CssBaseline />
      <AppBar
        position="absolute"
        fullWidth
        color="default"
        elevation={5}
        sx={{
          position: 'relative',
        //   borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* <Typography variant="h6" color="inherit" noWrap>
          
        </Typography> */}
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Grid container spacing={3} marginBottom={5}>
           
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
            {/* <Grid item xs={12} sm={6}>
              <TextField
                required
                id="passwword"
                name="password"
                label="Password"
                fullWidth
                type="password"
                variant="standard"
                value={stateVar.Data.password}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                fullWidth
                type="password"
                variant="standard"
                value={stateVar.Data.confirmPassword}
                onChange={handleChange}
              />
            </Grid> */}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                 {activeStep !== 0 && (
                  <Button onClick = {handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )}

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Register
                </Button>
              </Box>
      </Container>
    </React.Fragment>
    
          )}
        </Paper>
        
      </Container>
      <Footer/>
      </Box>
    </React.Fragment>
  );
}