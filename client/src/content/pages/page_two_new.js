import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { nanoid } from "nanoid";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import Footer from "../../components/Footer";
import bg_pic from "../../components/images/bg.jpg";
import profile_pic from "../../components/images/profile.webp";

import DocViewer from "./Components/DocViewer";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import RegisterReadExp from "./Components/RegisterReadExp";
import RegisterReadQuali from "./Components/RegisterReadQuali";
import { Fragment } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import {
  renderButton,
  renderInputSelect,
} from "./Components/displayComponents";
// import dayjs from "dayjs";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from "react-router";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableContainer,
} from "@material-ui/core";
import { Search } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { backendURL } from "../../configKeys";
const uuid = require("uuid").v4;

// import Page1 from './page_one'
// import Page2 from './page_two';
// import Page3 from './page_three'

const steps = ["Personal Information", "Other Details", "Upload Resume"];

export default function Page2New() {
  const location = useLocation();
  // const [fileData, setfileData] = React.useState();
  const [open, setOpen] = React.useState(false);
  const [Edit, setEdit] = React.useState(0);
  const [newGuideline, setNewGuideline] = React.useState({
    mongo_file_id: "",
  });
  // const columns = [
  //   {
  //     field: "mongo_file_id",
  //     headerName: "View",
  //     width: 110,
  //     renderCell: (params) => {
  //       return (
  //         <Button>
  //           <DocViewer
  //             filename={params.row.mongo_file_id}
  //             contentType="application/pdf"
  //           />
  //         </Button>
  //       );
  //     },
  //   },
  // ]
  const [activeStep, setActiveStep] = React.useState(1);
  const navigate = useNavigate();
  const arr = [
    { value: "Computer Engineering", label: "Computer Engineering" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    {
      value: "Electronics and Communication Engineering",
      label: "Electronics and Communication Engineering",
    },
    { value: "Information Technology", label: "Information Technology" },
    { value: "Aeronautical Engineering", label: "Aeronautical Engineering" },
    { value: "Biotechnology", label: "Biotechnology" },
    { value: "Automobile Engineering", label: "Automobile Engineering" },
    { value: "Environmental Engineering", label: "Environmental Engineering" },
    {
      value: "Instrumentation Engineering",
      label: "Instrumentation Engineering",
    },
    { value: "Petroleum Engineering", label: "Petroleum Engineering" },
    { value: "Metallurgical Engineering", label: "Metallurgical Engineering" },
    { value: "Mining Engineering", label: "Mining Engineering" },
  ];

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    navigate("/register/page3");
  };
  const handleBack = () => {
    setActiveStep(activeStep - 1);
    navigate("/register/page1");
  };
  const [stateVar, setStateVar] = React.useState({
    Data: {
      college: "",
      department: "",
      university: "",
      specializationDomain: "",
      mongo_file_id: "",
      // password: '',
      // confirmPassword: '',
    },
    errors: {},
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
  // function fileUpload(event) {
  //   if (event.target.files[0].type != "application/pdf") {
  //     alert("Please upload PDF file");
  //     return;
  //   } else {
  //     let data = new FormData();
  //     data.append("file", event.target.files[0], event.target.files[0].name);
  //     // console.log("File Upload:", event);
  //     // setfileData(data);
  //   }
  // }
  const handleChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let Data = { ...stateVar.Data };
    Data[target.name] = target.value;
    console.log(target.name, target.value);
    setStateVar({ Data: Data, errors: errors });
    // const { name, value } = e.target;
    // //console.log(name, value)
    // setStateVar((prevData) => ({
    //   ...prevData,
    //   Data.name: value,
    // }));
  };
  React.useEffect(() => {
    // Access the data passed from Page1New
    console.log("navigate location", location.state);
    const { dataFromPage1 } = location.state || {};
    if (dataFromPage1) {
      setStateVar((prevState) => ({
        ...prevState,
        Data: { ...prevState.Data, ...dataFromPage1 },
      }));
    } else {
      // Handle case where data is not available
    }
  }, [navigate.location]);
  const handleSubmit = () => {
    let { Data, errors } = stateVar;
    if (Data.specializationDomain === "") {
      errors["specializationDomain"] = "Specialization Domain cannot be empty";
    } else {
      errors["specializationDomain"] = "";
    }
    if (Data.college === "") {
      errors["college"] = "College Domain cannot be empty";
    } else {
      errors["college"] = "";
    }
    if (Data.university === "") {
      errors["university"] = "University cannot be empty";
    } else {
      errors["university"] = "";
    }
    // if (Data.password === "") {
    //     errors["password"] = "Password cannot be empty";
    // } else {
    //     const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    //     if (!passwordRegex.test(Data.password)) {
    //         errors["password"] = "Password should contain at least 8 characters, one letter, one number, and one special character";
    //     } else {
    //         errors["password"] = "";
    //     }
    // }

    // if (Data.confirmPassword === "") {
    //     errors["confirmPassword"] = "Confirm Password cannot be empty";
    // } else if (Data.password !== Data.confirmPassword) {
    //     errors["confirmPassword"] = "Passwords do not match";
    // } else {
    //     errors["confirmPassword"] = "";
    // }
    let validate = true;

    Object.keys(errors).map((error) => {
      if (errors[error] !== "") {
        validate = false;
      }
    });
    if (validate == true) {
      console.log("All data is correctly filled", Data);
      handleNext();
      navigate("/register/page3", { state: { dataFromPage2: stateVar.Data } });
    } else {
      console.log(errors);
      alert("Please fill all data first");
    }
  }
 

  return (
    <React.Fragment>
      <Box
        sx={{
          backgroundImage: `url(${bg_pic})`,
          top: "0px",
          right: "0px",
          bottom: "0px",
          left: "0px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundAttachment: "fixed",
          backgroundSize: "cover",
          minHeight: "100vh",
          backgroundColor: "#767676",
        }}
      >
        <CssBaseline />
        <AppBar
          position="absolute"
          color="default"
          elevation={0}
          sx={{
            position: "relative",
            borderBottom: (t) => `1px solid ${t.palette.divider}`,
          }}
        ></AppBar>
        <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Paper
            variant="outlined"
            sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 }, opacity: 0.9 }}
          >
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
              style={{ fontSize: "1.5rem", margin: "20px" }}
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
                    position: "relative",
                    //   borderBottom: (t) => `1px solid ${t.palette.divider}`,
                  }}
                >
                  {/* <Typography variant="h6" color="inherit" noWrap>
          
        </Typography> */}
                </AppBar>
                <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
                  <Grid container spacing={3} marginBottom={5}>
                    <Grid item xs={12}>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        College
                      </InputLabel>
                      <TextareaAutosize
                        required
                        id="college"
                        name="college"
                        aria-label=""
                        placeholder="Mention your college name"
                        minRows={1}
                        fullWidth
                        value={stateVar.Data.college}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        label="Department"
                        select
                        color="primary"
                        variant="outlined"
                        name="department"
                        fullWidth={true}
                        size="small"
                        value={stateVar.Data.department}
                        onChange={handleChange}
                      >
                        {arr.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        University
                      </InputLabel>
                      <TextareaAutosize
                        required
                        id="university"
                        name="university"
                        aria-label=""
                        placeholder="Mention your university"
                        minRows={1}
                        fullWidth
                        value={stateVar.Data.university}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputLabel
                        variant="standard"
                        htmlFor="uncontrolled-native"
                      >
                        Specialization
                      </InputLabel>
                      <TextareaAutosize
                        required
                        id="specializationDomain"
                        name="specializationDomain"
                        aria-label=""
                        placeholder="Mention your domain of specialization"
                        minRows={1}
                        fullWidth
                        value={stateVar.Data.specializationDomain}
                        onChange={handleChange}
                        style={{
                          padding: "10px",
                          fontSize: "16px",
                          border: "1px solid #ccc",
                          borderRadius: "5px",
                          width: "100%",
                          boxSizing: "border-box",
                        }}
                      />
                    </Grid>
                    {/* <Grid sm item>
                      <Button fullWidth variant="outlined">
                        <input
                          type="file"
                          accept={".pdf"}
                          onChange={(event) => fileUpload(event)}
                          // style={{ color: "transparent" }}
                        />
                      </Button>
                    </Grid> */}
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
                  <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    {activeStep !== 0 && (
                      <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                        Back
                      </Button>
                    )}

                    <Button
                      variant="contained"
                      onClick={handleSubmit}
                      sx={{ mt: 3, ml: 1 }}
                    >
                      Next
                    </Button>
                  </Box>
                </Container>
              </React.Fragment>
            )}
          </Paper>
        </Container>
        <Footer />
      </Box>
    </React.Fragment>
  );
}
