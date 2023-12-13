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
// import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
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

export default function Page2New() {
  const [activeStep, setActiveStep] = React.useState(1);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };
  const handleBack = () =>{
    setActiveStep(activeStep - 1);
    navigate("/register/page1")
  }

  const navigate = useNavigate();
  const [stateVar, setStateVar] = React.useState({
    Data: {
    qualifications: [
        {
        specialization: '',
        periodFrom: '',
        periodTo: '',
        },
    ],
    experiences: [
        {
          workPlace: '',
          rankDesignation: '',
          years: '',
        },
      ], 
  },
  errors:{}
});
   const [contacts, setContacts] = React.useState(stateVar.Data.experiences);
   const [addFormData, setAddFormData] = React.useState({
    workPlace: "",
    rankDesignation: "",
    years: "",
  });
  const [conQualifications, setConQualification] = React.useState(stateVar.Data.qualifications);
   const [addFormDataQuali, setAddFormDataQuali] = React.useState({
    specialization: "",
    periodFrom: "",
    periodTo: "",
  });
  const [periodFromDate, setPeriodFromDate] = React.useState(null);
  const [periodToDate, setPeriodToDate] = React.useState(null);
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
        console.log('Form submitted:', Data);
        if (Data.experiences.length > 1) {
            for (let index = 1; index < Data.experiences.length; index++) {
                const hasEmptyField = Object.values(Data.experiences[index]).some((field) => field === "");
        
                if (hasEmptyField) {
                    errors["experiences"] = "All subfields in Experiences should be filled";
                    break;
                } 
                else {
                    var isValidYears = /^\d+$/.test(Data.experiences[index].years) && parseInt(Data.experiences[index].years) >= 0 && parseInt(Data.experiences[index].years) <= 100;

                    if (!isValidYears) {
                        errors["experiences"] = "Years should be a numeric value between 0 and 100";
                        break;
                    } else {
                        errors["experiences"] = "";
                    }
                }
            }
        } else {
            errors["experiences"] = "";
        }
        if (Data.qualifications.length > 1) {
            for (let index = 1; index < Data.qualifications.length; index++) {
                const hasEmptyField = Object.values(Data.qualifications[index]).some((field) => field === "");
        
                if (hasEmptyField) {
                    errors["qualifications"] = "All subfields in Qualifications should be filled";
                    break;
                } else {    
                    var dateFrom = Data.qualifications[index].periodFrom.split("-")
                    var dateTo= Data.qualifications[index].periodTo.split("-")
                    console.log(dateFrom)
                    console.log(dateTo)
                    if ((Number(dateFrom[2])>Number(dateTo[2]))||((Number(dateFrom[2]) == Number(dateTo[2])) && (Number(dateFrom[1]) > Number(dateTo[1])))||((Number(dateFrom[2]) == Number(dateTo[2])) && (Number(dateFrom[1]) == Number(dateTo[1])) && (Number(dateFrom[0]) > Number(dateTo[0])))) {
                        errors["qualifications"] = "Period From date should be less than Period To date";
                        break
                    } else {
                        errors["qualifications"] = "";
                    }
                }
            }
        } else {
            errors["qualifications"] = "";
        }
        let validate = true;

        Object.keys(errors).map((error) => {
          if (errors[error] !== "") {
            validate = false;
          }
        });
        if (validate == true) {
            console.log("All data is correctly filled", Data)
            navigate("/register/page3")
          } else {
            console.log(errors)
            alert("Please fill all data first");
          }
    };

    // const professionalExperienceChange = (value) => {
    //     // let errors = { ...stateVar.errors };
    //     // let Data = { ...stateVar.Data };
    //     // Data[target.name] = target.value;
    // //setStateVar({ Data: Data, errors: errors });
    //     setStateVar((prevData) => ({
    //         ...prevData,
    //         experiences: value,
    //     }));
    //     console.log(contacts)
    // }
    const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
    handleChange({target:{name:"experiences", value:newContacts}})
    // professionalExperienceChange(newContacts)
  };
  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...addFormData };
    newFormData[fieldName] = fieldValue;

    setAddFormData(newFormData);
};
const handleAddFormSubmit = (event) => {
    event.preventDefault();
    // console.log("run");
    // companyName: ""
    // rankDesignation: ""
    // periodFrom: ""
    // periodFrom: ""
    // workNature: ""

//console.log(addFormData)

    const newContact = {
        id: nanoid(),
        workPlace: addFormData.workPlace,
        rankDesignation: addFormData.rankDesignation,
        years: addFormData.years,
    };
// console.log(newContact.companyName);
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    var getValue1= document.getElementById("t1");
    getValue1.value = "";
    var getValue2= document.getElementById("t2");
    getValue2.value = "";
    var getValue3= document.getElementById("t4");
    getValue3.value = ""
    handleChange({target:{name:"experiences", value:newContacts}})
    setAddFormData({
        workPlace: "",
        rankDesignation: "",
        years: "",
      })
    // professionalExperienceChange(newContacts)
};
//Qualifications
    // const qualificationsChange = (value) => {
    //     setStateVar((prevData) => ({
    //         ...prevData,
    //         qualifications: value,
    //     }));
    //     console.log(conQualifications)
    // }
    const handleDeleteClickQuali = (contactId) => {
        const newContacts = [...conQualifications];

        const index = conQualifications.findIndex((qualification) => qualification.id === contactId);

        newContacts.splice(index, 1);

        setConQualification(newContacts);
        handleChange({target:{name:"qualifications", value:newContacts}})
        //qualificationsChange(newContacts)
    };
    const handleAddFormChangeQuali = (event) => {
        event.preventDefault();

        const fieldName = event.target.getAttribute("name");
        const fieldValue = event.target.value;

        const newFormData = { ...addFormDataQuali };
        newFormData[fieldName] = fieldValue;

        setAddFormDataQuali(newFormData);
    };
    const handleAddFormSubmitQuali = (event) => {
        event.preventDefault();
        //console.log(addFormData)

        const newContact = {
            id: nanoid(),
            specialization: addFormDataQuali.specialization,
            periodFrom: addFormDataQuali.periodFrom,
            periodTo: addFormDataQuali.periodTo,
        };
        // console.log(newContact.companyName);
        const newContacts = [...conQualifications, newContact];
        setConQualification(newContacts);
        var getValue1= document.getElementById("t5");
        getValue1.value = "";
        var getValue2= document.getElementById("t6");
        getValue2.value = "";
        var getValue3= document.getElementById("t7");
        getValue3.value = ""
        handleChange({target:{name:"qualifications", value:newContacts}})
        setAddFormDataQuali({
            specialization: "",
            periodFrom: "",
            periodTo: "",
          })
        //qualificationsChange(newContacts)
    };
    const handleOnChangeDate = (name, value) => {
        const newFormData = { ...addFormDataQuali };
        let d = value.$D
        let m = value.$M + 1
        let y = value.$y
        newFormData[name] = d + "-" + m + "-" + y
    
        if(name == "periodFrom"){
          setPeriodFromDate(
            dayjs(
              y + "-" + m + "-" + d
            )
          )
        }
        else{
          setPeriodToDate(
            dayjs(
              y + "-" + m + "-" + d
            )
          )
        }
        setAddFormDataQuali(newFormData);
      }
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
      {/* <CssBaseline /> */}
      <AppBar
        position="absolute"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
        //   borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        {/* <Typography variant="h6" color="inherit" noWrap>
        Qualification and Experience
        </Typography> */}
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
            <Typography component="h2" variant="h4" align="left">
            Qualification and Experience
          </Typography>
            <Grid container spacing={3} marginBottom={5}>
            <Grid item xs={20}>
            <TableContainer sx={{marginBottom : "20px", width: "100%"}}>
                <TableHead>
                            <TableRow>
                                <TableCell sx={{width: "30%"}}>Specialization</TableCell>
                                <TableCell sx={{width: "30%"}}>Period From</TableCell>
                                <TableCell sx={{width: "30%"}}>Period To</TableCell>

                                <TableCell sx={{width: "30%"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {conQualifications.slice(1).map((qualification) => (
                    <Fragment>
                        <RegisterReadQuali
                        contact={qualification}
                        handleDeleteClick={handleDeleteClickQuali}
                        />
                    </Fragment>
                    ))
                }
                
                  </TableBody>
                  <div style={{ display: 'flex', gap: '2px' }}>
                  <TextField
					label="Specialization"
					// color={color ? color : "primary"}
					variant="outlined"
                    type = "search"
					name="specialization"
					// fullWidth={true}
					size="medium"
					onChange={handleAddFormChangeQuali}
					style={{margin:"9px", width: '25%', marginRight:"25px" }}
                    id = "t5"
				/>
                
				{/* {<LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                          {" "}
                          <DemoItem label="">
                            <DatePicker
                              disableFuture
                              // views={['year', 'month', 'day']}
                              slotProps={{
                                textField: {
                                    required: true,
                                    id: 't6',
                                    style: { width: '80%' }
                                }
                            }}
                            value = {periodFromDate}
                              name="periodFrom"
                              onChange={(value) => {
                                handleOnChangeDate("periodFrom", value)
                              }}
                            ></DatePicker>
                          </DemoItem>
                        </DemoContainer>
                        <DemoContainer components={["DatePicker"]}>
                            {" "}
                            <DemoItem label="">
                            <DatePicker
                                disableFuture
                                // views={['year', 'month', 'day']}
                                slotProps={{
                                textField: {
                                    required: true,
                                    id: 't7',
                                    style: { width: '80%' }
                                }
                            }}
                            value = {periodToDate}
                                name="periodTo"
                                onChange={(value) => {
                                handleOnChangeDate("periodTo", value)
                                }}
                            ></DatePicker>
                            </DemoItem>
                        </DemoContainer>
            </LocalizationProvider>} */}
                {/* <TextField
					label="Nature of Work"
					// color={color ? color : "primary"}
					variant="outlined"
					name="workNature"
					// fullWidth={true}
					size="medium"
					//style={{ margin: "1px" }}
					onChange={handleAddFormChange}
                    id = "t5"
				/> */}
                <Button
                  variant="contained"
                  onClick={handleAddFormSubmitQuali}
                  sx={{ mt: 1, mb: 1 }}
                >
                  Add
                </Button>
            </div>
                </TableContainer>

              </Grid>
            {/* <Grid item xs={12}>
              <TextField
                required
                id="qualification"
                name="qualification"
                label="Qualification"
                variant="standard"
                value={Data.qualifications[0]}
                onChange={(e) => handleQualificationChange(0, e.target.value)}
              />
              <Button variant="outlined" onClick={handleAddQualification} sx={{ m: 1 }}>
                Add Qualification
              </Button>
              {Data.qualifications.slice(1).map((qualification, index) => (
                <TextField
                  key={index + 1}
                  variant="standard"
                  label={`Qualification ${index + 2}`}
                  value={qualification}
                  onChange={(e) => handleQualificationChange(index + 1, e.target.value)}
                  sx={{ mt: 1 }}
                />
              ))}
              </Grid> */}
            <Grid item xs={20}>
            <TableContainer sx={{marginBottom : "20px", width: "100%"}}>
                <TableHead>
                            <TableRow>
                                <TableCell sx={{width: "30%"}}>Work Place</TableCell>
                                <TableCell sx={{width: "30%"}}>Designation or Rank</TableCell>
                                <TableCell sx={{width: "30%"}}>Years</TableCell>

                                <TableCell sx={{width: "30%"}}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                {contacts.slice(1).map((contact) => (
                    <Fragment>
                        <RegisterReadExp
                        contact={contact}
                        handleDeleteClick={handleDeleteClick}
                        />
                    </Fragment>
                    ))
                }
                
                  </TableBody>
                  <div style={{ display: 'flex', gap: '2px', height:"68px" }}>
                  <TextField
					label="Working Place"
					// color={color ? color : "primary"}
					variant="outlined"
                    type = "search"
					name="workPlace"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChange}
					style={{ margin: "9px", width: '27%' }}
                    id = "t1"
				/>
				<TextField
					label="Designation and Rank"
					// color={color ? color : "primary"}
					variant="outlined"
                    type = "search"
					name="rankDesignation"
					// fullWidth={true}
					size="small"
					style={{ margin: "9px", width: '27%' }}
					onChange={handleAddFormChange}
                    id = "t2"
				/>
                <TextField
					label="Years"
					// color={color ? color : "primary"}
					variant="outlined"
                    type = "search"
					name="years"
					// fullWidth={true}
					size="small"
					style={{ margin: "9px", width: '27%', marginRight:"33px" }}
					onChange={handleAddFormChange}
                    id = "t4"
				/>
                {/* <TextField
					label="Nature of Work"
					// color={color ? color : "primary"}
					variant="outlined"
					name="workNature"
					// fullWidth={true}
					size="medium"
					//style={{ margin: "1px" }}
					onChange={handleAddFormChange}
                    id = "t5"
				/> */}
                <Button
                  variant="contained"
                  onClick={handleAddFormSubmit}
                  sx={{ mt: 1.2, mb: 2.2 }}
                >
                  Add
                </Button>
            </div>
                </TableContainer>

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
            </React.Fragment>
          )}
        </Paper>
      </Container>
    </React.Fragment>
  );
}