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
  const [Data, setData] = React.useState({
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
  });
   const [contacts, setContacts] = React.useState(Data.experiences);
   const [addFormData, setAddFormData] = React.useState({
    workPlace: "",
    rankDesignation: "",
    years: "",
  });
  const [conQualifications, setConQualification] = React.useState(Data.qualifications);
   const [addFormDataQuali, setAddFormDataQuali] = React.useState({
    specialization: "",
    periodFrom: "",
    periodTo: "",
  });
  const [periodFromDate, setPeriodFromDate] = React.useState(null);
  const [periodToDate, setPeriodToDate] = React.useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

//   const handleQualificationChange = (index, value) => {
//     const newQualifications = [...Data.qualifications];
//     newQualifications[index] = value;
//     setData((prevData) => ({
//       ...prevData,
//       qualifications: newQualifications,
//     }));
//   };

//   const handleAddQualification = () => {
//     setData((prevData) => ({
//       ...prevData,
//       qualifications: [...prevData.qualifications, ''],
//     }));
//   };

//   const handleExperienceChange = (index, value) => {
//     const newExperiences = [...Data.experiences];
//     newExperiences[index] = value;
//     setData((prevData) => ({
//       ...prevData,
//       experiences: newExperiences,
//     }));
//   };

//   const handleAddExperience = () => {
//     setData((prevData) => ({
//       ...prevData,
//       experiences: [...prevData.experiences, ''],
//     }));
//   };

    const handleSubmit = () => {
        console.log('Form submitted:', Data);
    };

    const professionalExperienceChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            experiences: value,
        }));
        console.log(contacts)
    }
    const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.id === contactId);

    newContacts.splice(index, 1);

    setContacts(newContacts);
    professionalExperienceChange(newContacts)
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
    professionalExperienceChange(newContacts)
};
//Qualifications
    const qualificationsChange = (value) => {
        setData((prevData) => ({
            ...prevData,
            qualifications: value,
        }));
        console.log(conQualifications)
    }
    const handleDeleteClickQuali = (contactId) => {
        const newContacts = [...conQualifications];

        const index = conQualifications.findIndex((qualification) => qualification.id === contactId);

        newContacts.splice(index, 1);

        setConQualification(newContacts);
        qualificationsChange(newContacts)
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
        // console.log("run");
        // companyName: ""
        // rankDesignation: ""
        // periodFrom: ""
        // periodFrom: ""
        // workNature: ""

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
        qualificationsChange(newContacts)
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
      const handleOnChange = ({ target }) => {
        let data = { ...Data};
        data[target.name] = target.value;
        setData({ data: data });
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
        <Typography variant="h6" color="inherit" noWrap>
          {/* Your Website */}
        </Typography>
      </AppBar>
      <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
          <Typography component="h1" variant="h4" align="center">
            Curriculum Developer Registration
          </Typography>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                fullWidth
                autoComplete="email"
                variant="standard"
                value={Data.email}
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
                value={Data.name}
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
                value={Data.contactNumber}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
                <InputLabel id="gender-label">Gender</InputLabel>
                <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    fullWidth
                    value={Data.gender}
                    onChange={handleOnChange}
                    label="Gender"
                >
                <div style={{ display: "flex", flexDirection: "column" }}>
                    <MenuItem value="male">Male</MenuItem>
                    <MenuItem value="female">Female</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                </div>
                </Select>
            </Grid>
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
                                    style: { width: '60%' }
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
            {/* </LocalizationProvider>}
        {    <LocalizationProvider dateAdapter={AdapterDayjs}> */}
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
                                    style: { width: '60%' }
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
                  <TextField
					label="Name of the company"
					// color={color ? color : "primary"}
					variant="standard"
                    type = "search"
					name="workPlace"
					// fullWidth={true}
					size="small"
					onChange={handleAddFormChange}
					style={{ margin: "5px", width: '30%' }}
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
					style={{ margin: "5px", width: '28%' }}
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
					style={{ margin: "5px", width: '28%' }}
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
                </TableContainer>

              </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                required
                id="currentJob"
                name="currentJob"
                aria-label="Current Job"
                placeholder="Current Job"
                minRows={3}
                fullWidth
                value={Data.currentJob}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                required
                id="research"
                name="research"
                aria-label="Research"
                placeholder="Research"
                minRows={3}
                fullWidth
                value={Data.research}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextareaAutosize
                required
                id="previousWork"
                name="previousWork"
                aria-label="Previous Curriculum Development Work"
                placeholder="Any previous curriculum development work"
                minRows={3}
                fullWidth
                value={Data.previousWork}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="specializationDomain"
                name="specializationDomain"
                label="Specialization Domain"
                fullWidth
                variant="standard"
                value={Data.specializationDomain}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="contained" onClick={handleSubmit} sx={{ mt: 3, ml: 1 }}>
              Register
            </Button>
          </Box>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
