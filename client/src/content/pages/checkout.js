import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { nanoid } from "nanoid";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';

import Button from '@mui/material/Button';
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
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableContainer,
  } from "@material-ui/core";
import { Search } from '@mui/icons-material';
export default function CurriculumDeveloperRegistration() {
  const [stateVar, setStateVar] = React.useState({
    Data: {
    email: '',
    name: '',
    contactNumber: '',
    gender: '',
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
    currentJob: '',
    research: '',
    previousWork: '',
    specializationDomain: '',
    password: '',
    confirmPassword: '',
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
        console.log("date",Data.qualifications[1].periodFrom)
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
        <Typography variant="h6" color="inherit" noWrap>
          {/* Your Website */}
        </Typography>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center" sx={{ marginBottom: 5, fontSize: '1.5rem'}}>
            Curriculum Developer Registration
          </Typography>
          <Typography component="h2" variant="h4" align="left">
            Personal Info
          </Typography>
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
                  <div style={{ display: 'flex', gap: '5px' }}>
                  <TextField
					label="Specialization"
					// color={color ? color : "primary"}
					variant="standard"
                    type = "search"
					name="specialization"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChangeQuali}
					style={{ margin: "5px", width: '25%' }}
                    id = "t5"
				/>
                
				{<LocalizationProvider dateAdapter={AdapterDayjs}>
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
                                    style: { width: '55%' }
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
                                    style: { width: '55%' }
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
            </LocalizationProvider>}
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
                {renderButton({
              label: "Add",
              handleOnClick: handleAddFormSubmitQuali,
            })}
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
                  <div style={{ display: 'flex', gap: '5px', height: '60px' }}>
                  <TextField
					label="Working Place"
					// color={color ? color : "primary"}
					variant="standard"
                    type = "search"
					name="workPlace"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChange}
					style={{ margin: "5px", width: '28%' }}
                    id = "t1"
				/>
				<TextField
					label="Designation and Rank"
					// color={color ? color : "primary"}
					variant="standard"
                    type = "search"
					name="rankDesignation"
					// fullWidth={true}
					size="small"
					style={{ margin: "5px", width: '27%' }}
					onChange={handleAddFormChange}
                    id = "t2"
				/>
                <TextField
					label="Years"
					// color={color ? color : "primary"}
					variant="standard"
                    type = "search"
					name="years"
					// fullWidth={true}
					size="small"
					style={{ margin: "5px", width: '27%' }}
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
                {renderButton({
              label: "Add",
              handleOnClick: handleAddFormSubmit,
            })}
            </div>
                </TableContainer>

              </Grid>
              </Grid>
              <Typography component="h2" variant="h4" align="left">
            Other Information
          </Typography>
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
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', m: "5px"}}>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
