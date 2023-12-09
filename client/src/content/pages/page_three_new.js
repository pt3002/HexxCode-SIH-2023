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





import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { nanoid } from "nanoid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';


import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import RegisterReadExp from './Components/RegisterReadExp';
import RegisterReadQuali from './Components/RegisterReadQuali'
import { Fragment  } from "react";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import { renderButton, renderInputSelect } from './Components/displayComponents';
import dayjs from "dayjs";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useNavigate } from 'react-router';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
  } from "@material-ui/core";
import { Search } from '@mui/icons-material';
// import Page1 from './page_one'
// import Page2 from './page_two';
// import Page3 from './page_three'


const steps = ['Personal Information', 'Academic and Work Details', 'Other Details'];

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
  const [activeStep, setActiveStep] = React.useState(2);
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
    currentJob: '',
    research: '',
    previousWork: '',
    specializationDomain: '',
    password: '',
    confirmPassword: '',
  },
  errors:{}
});
  const handleChange = ({target}) => {
    let errors = { ...stateVar.errors };
    let Data = { ...stateVar.Data };
    Data[target.name] = target.value;
    console.log(target.name, target.value)
    setStateVar({ Data: Data, errors: errors });
    // const { name, value } = e.target;
    // //console.log(name, value)
    // setStateVar((prevData) => ({
    //   ...prevData,
    //   Data.name: value,
    // }));
  };
    const handleSubmit = () => {
        let { Data, errors } = stateVar;        
        if (Data.specializationDomain === "") {
            errors["specializationDomain"] = "Specialization Domain cannot be empty";
        } else {
            errors["specializationDomain"] = "";
        }
        if (Data.currentJob === "") {
            errors["currentJob"] = "Current Job Domain cannot be empty";
        } else {
            errors["currentJob"] = "";
        }
        if (Data.previousWork === "") {
            errors["previousWork"] = "Previous Work cannot be empty";
        } else {
            errors["previousWork"] = "";
        }
        if (Data.password === "") {
            errors["password"] = "Password cannot be empty";
        } else {
            const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            if (!passwordRegex.test(Data.password)) {
                errors["password"] = "Password should contain at least 8 characters, one letter, one number, and one special character";
            } else {
                errors["password"] = "";
            }
        }
    
        if (Data.confirmPassword === "") {
            errors["confirmPassword"] = "Confirm Password cannot be empty";
        } else if (Data.password !== Data.confirmPassword) {
            errors["confirmPassword"] = "Passwords do not match";
        } else {
            errors["confirmPassword"] = "";
        }
        let validate = true;

        Object.keys(errors).map((error) => {
          if (errors[error] !== "") {
            validate = false;
          }
        });
        if (validate == true) {
            console.log("All data is correctly filled", Data)
            handleNext();
          } else {
            console.log(errors)
            alert("Please fill all data first");
          }
    };





  return (
    <React.Fragment>
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
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
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
            <Grid item xs={12}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Current Job
                </InputLabel>
                <TextareaAutosize
                    required
                    id="currentJob"
                    name="currentJob"
                    aria-label=""
                    placeholder="Mention and describe about your current job"
                    minRows={1}
                    fullWidth
                    value={stateVar.Data.currentJob}
                    onChange={handleChange}
                    style={{
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                    }}
                    />
            </Grid>
            <Grid item xs={12}>
                <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Research
                </InputLabel>
                <TextareaAutosize
                    required
                    id="research"
                    name="research"
                    aria-label=""
                    placeholder="List your areas of expertise/ research"
                    minRows={1}
                    fullWidth
                    value={stateVar.Data.research}
                    onChange={handleChange}
                    style={{
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                    }}
                />
            </Grid>
            <Grid item xs={12}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Previous Work
                </InputLabel>
                <TextareaAutosize
                    required
                    id="previousWork"
                    name="previousWork"
                    aria-label=""
                    placeholder="Mention your previous work/ Experience in Curriculum Designing"
                    minRows={1}
                    fullWidth
                    value={stateVar.Data.previousWork}
                    onChange={handleChange}
                    style={{
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                    }}
                />
            </Grid>
            <Grid item xs={12}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
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
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                    }}
                />
            </Grid>
            <Grid item xs={12} sm={6}>
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
            </Grid>
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
                  {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                </Button>
              </Box>
      </Container>
    </React.Fragment>
    
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}