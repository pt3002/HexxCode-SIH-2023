import { Helmet } from 'react-helmet-async';
import * as React from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CssBaseline from '@mui/material/CssBaseline';
import PageTitleWrapper from '../../../components/PageTitleWrapper';
import {TextField} from "@material-ui/core";
import PageHeader from '../../dashboards/Crypto/PageHeader';
import { SelectChangeEvent } from "@material-ui/core/Select";
import { Container } from '@mui/material';
import BooksTable from '../Components/BooksTable/BooksTable';
import { subDays } from 'date-fns';
import { Card } from '@mui/material';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Paper from '@mui/material/Paper';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { useNavigate } from 'react-router';
import AppBar from '@mui/material/AppBar';
const steps = ['Requirements form'];

function Requirements(){
  const [activeStep, setActiveStep] = React.useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  // const handleBack = () =>{
  //   setActiveStep(activeStep - 1);
  //   navigate("/register/page2")
  // }
  const [stateVar, setStateVar] = React.useState({
    Data: {
    branch: '',
    subject: '',
    suggestions: '',
    //specializationDomain: '',
    // password: '',
    // confirmPassword: '',
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
  const handleOnChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let Data = { ...stateVar.Data };
    Data[target.name] = target.value;
    setStateVar({ Data: Data, errors: errors });
  
  };
  const arr = [
    { value: "Computer Engineering", label: "Computer Engineering" },
    { value: "ENTC", label: "ENTC" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    { value: "Manufacturing and Production Engineering", label: "Manufacturing and Production Engineering" }
  ]
  const subjects = {
    "Computer Engineering": [{value:"DSA",label:"DSA"},{value:"CN", label:"CN"}],
    "ENTC": [{value:"sub1",label:"sub1"},{value:"sub2", label:"sub2"}],
    "Electrical Engineering": [{value:"sub4",label:"sub4"},{value:"sub3", label:"sub3"}],
    "Chemical Engineering": [{value:"sub5",label:"sub5"},{value:"sub6", label:"sub6"}],
    "Civil Engineering": [{value:"sub8",label:"sub8"},{value:"sub7", label:"sub7"}],
    "Mechanical Engineering": [{value:"sub9",label:"sub9"},{value:"sub10", label:"sub10"}],
    "Manufacturing and Production Engineering": [{value:"sub11",label:"sub11"},{value:"sub12", label:"sub12"}],
  };
      const handleSubmit = () => {
        let { Data, errors } = stateVar;   
        if (Data.branch === "") {
            errors["branch"] = "Branch cannot be empty";
        } else {
            errors["branch"] = "";
        }
        if (Data.subject === "") {
            errors["subject"] = "Subject cannot be empty";
        } else {
            errors["subject"] = "";
        }
        if (Data.suggestions === "") {
            errors["suggestions"] = "suggestions cannot be empty";
        } else {
            errors["suggestions"] = "";
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
            console.log("All data is correctly filled", Data)
            console.log(Data)
            handleNext();
          } else {
            console.log(errors)
            alert("Please fill all data first");
          }
    };
    return(
        <>
        <Helmet>
            <title>Requirements Form</title>
        </Helmet>
        {/* <PageTitleWrapper>
            <PageHeader />
        </PageTitleWrapper> */}
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 0.5 }, p: { xs: 2, md: 1 } }}>
        <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontSize: '1.5rem', margin: '20px' }}
            >
            Requirements Form
            </Typography>
        <Container maxWidth = "lg">
        {activeStep === steps.length ? (
            <React.Fragment>
              <Typography variant="h5" gutterBottom>
                Requirement Recorded
              </Typography>
              <Typography variant="subtitle1">
                Your requirements will be visible to the Curriculum Developers. Please stay tuned for further updates...
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
            <TextField
					label= "Branch"
					select
					color="primary"
					variant="outlined"
					name="branch"
					fullWidth={true}
					size="small"
					value={stateVar.Data.branch}
					onChange={handleOnChange}
				>
					{arr.map((option) => (
						<MenuItem key={option.value} value={option.value}>
							{option.label}
						</MenuItem>
					))}
				</TextField>
            </Grid>
            <Grid item xs={12}>
            <TextField
					label= "Subject"
					select
					color="primary"
					variant="outlined"
					name="subject"
					fullWidth={true}
					size="small"
					value={stateVar.Data.subject}
					onChange={handleOnChange}
				>
					{stateVar.Data.branch && subjects[stateVar.Data.branch] ? (
            subjects[stateVar.Data.branch].map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))
          ) : (
            <MenuItem value="">Select a branch first</MenuItem>
          )}
				</TextField>
            </Grid>
            <Grid item xs={12}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Suggestions
                </InputLabel>
                <TextareaAutosize
                    required
                    id="suggestions"
                    name="suggestions"
                    aria-label=""
                    placeholder="Suggest your changes in the existing curriculum"
                    minRows={1}
                    fullWidth
                    value={stateVar.Data.suggestions}
                    onChange={handleChange}
                    style={{
                        padding: '10px', 
                        fontSize: '16px', 
                        border: '1px solid #ccc', 
                        borderRadius: '5px', 
                        width: '100%',
                        boxSizing: 'border-box', 
                        minHeight: '100px',
                        marginTop: "10px"
                    }}
                />
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
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{ mt: 3, ml: 1 }}
                >
                  Submit
                </Button>
              </Box>
      </Container>
    </React.Fragment>
    
          )}
            {/* <h1>Resources Page</h1>
            <Card>
                <BooksTable books = {books}/>
            </Card> */}
        </Container>
        </Paper>
        </>
    )
}

export default Requirements;