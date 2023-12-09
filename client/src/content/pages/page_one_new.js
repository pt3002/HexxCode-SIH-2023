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

export default function Page1New() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const navigate = useNavigate();
  const [stateVar, setStateVar] = React.useState({
    Data: {
    email: '',
    name: '',
    contactNumber: '',
    gender: '',
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
    const validateEmail = (email) => {
        return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };
    const handleSubmit = () => {
        let { Data, errors } = stateVar;    
        if (Data.name === "") {
            errors["name"] = "Field cannot be empty";
        } else {
            errors["name"] = "";
        }
        if (Data.email === "") {
            errors["email"] = "Email cannot be empty";
        } else if(!validateEmail(Data.email)){
            errors["email"] = "invalid email";
        }else{
            errors["email"] = "";
        }
        if (Data.contactNumber === "" ) {
            errors["contactNumber"] = "Contact Number cannot be empty";
        }else if (!new RegExp("^([0|+[0-9]{1,5})?([7-9][0-9]{9})$").test(Data.contactNumber)){
            errors["contactNumber"] = "Invalid Contact Number";
        }
         else {
            errors["contactNumber"] = "";
        }
    
        let validate = true;

        Object.keys(errors).map((error) => {
          if (errors[error] !== "") {
            validate = false;
          }
        });
        if (validate == true) {
            console.log("All data is correctly filled", Data)
            handleNext()
            navigate("/register/page2")
            
          } else {
            console.log(errors)
            alert("Please fill all data first");
          }
    };
      const arr = [
        { value: "male", label: "Male" },
        { value: "female", label: "Female" },
        { value: "Other", label: "Other" },
      ]

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
              {/* {getStepContent(activeStep)} */}
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
        <Typography variant="h6" color="inherit" noWrap>
          {/* Your Website */}
        </Typography>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
          <Grid container spacing={3} marginBottom={5}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                value={stateVar.Data.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="name"
                name="name"
                label="Name"
                fullWidth
                autoComplete="name"
                variant="standard"
                value={stateVar.Data.name}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="contactNumber"
                name="contactNumber"
                label="Contact Number"
                fullWidth
                autoComplete="tel"
                variant="standard"
                value={stateVar.Data.contactNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
                {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Gender
                </InputLabel> */}
                <Select
                    label = "Gender"
                    native
                    inputProps={{
                    name: 'gender',
                    id: 'uncontrolled-native',
                    }}
                    onChange={handleChange}
                    value={stateVar.Data.gender}
                >
                    {arr.map((choose) => (
					<option key={choose.value} value={choose.value}>
						{choose.label}
					</option>
				))}
                </Select>
            </FormControl>
             
            </Grid>
            </Grid>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: "5px"}}>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
             Next
            </Button>
          </Box>
      </Container>
    </React.Fragment>
              {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                {/* {activeStep !== 0 && (
                  <Button onClick={handleBack} sx={{ mt: 3, ml: 1 }}>
                    Back
                  </Button>
                )} */}

                {/* <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
                >
                  {activeStep === steps.length - 1 ? 'Register' : 'Next'}
                </Button>
              </Box> */}
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}