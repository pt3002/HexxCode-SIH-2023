import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import Select from "@mui/material/Select";
import { BACKEND_URL } from "../../../configKeys"
const uuid = require("uuid").v4;

export default function RegisterEducator() {
  const navigate = useNavigate();
  const [stateVar, setStateVar] = React.useState({
    Data: {
      email: "",
      name: "",
      university: "",
      college: "",
      designation: "",
      password: "",
      confirmPassword: "",
    },
    errors: {},
  });

  const handleChange = ({ target }) => {
    let errors = { ...stateVar.errors };
    let Data = { ...stateVar.Data };
    Data[target.name] = target.value;
    console.log(target.name, target.value);
    setStateVar({ Data: Data, errors: errors });
    console.log(Data);
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
    } else if (!validateEmail(Data.email)) {
      errors["email"] = "invalid email";
    } else {
      errors["email"] = "";
    }
    if (Data.university === "") {
      errors["university"] = "Field cannot be empty";
    } else {
      errors["university"] = "";
    }
    if (Data.college === "") {
      errors["college"] = "Field cannot be empty";
    } else {
      errors["college"] = "";
    }
    if (Data.designation === "") {
      errors["designation"] = "Field cannot be empty";
    } else {
      errors["designation"] = "";
    }
    if (Data.password === "") {
      errors["password"] = "Password cannot be empty";
    } else {
      const passwordRegex =
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(Data.password)) {
        errors["password"] =
          "Password should contain at least 8 characters, one letter, one number, and one special character";
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
    console.log("errors:",errors);
    console.log("data:",Data);
    Object.keys(errors).map((error) => {
      if (errors[error] !== "") {
        validate = false;
      }
    });
    if (validate == true) {
      console.log("All data is correctly filled", Data);
      // const initial_url = BACKEND_URL + "/Educator/EducatorRegister";
      const initial_url = "http://localhost:5001/api/Educator/educatorRegister";
      // let id = uuid();
      // let email = Data.email;
      // let name = Data.name
      // let college = Data.college
      // let university = Data.university
      // let designation = Data.designation
      // let password = Data.password
      let body = {id:uuid(), email:Data.email, name:Data.name, university:Data.university, college:Data.college, designation:Data.designation, password:Data.password};
      axios.post(initial_url, body).then(res => {
        if(res.data.message === "User with same email already registered"){
          Swal.fire({
            icon: "error",
            title: "ERROR",
            text: res.data.message,
            showConfirmButton: false,
            timer: 3000,
          });
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
          navigate("/register-educator");
        });
    } else {
      console.log(errors);
      alert("Please fill all data first");
    }
  };

  //   const arr = [
  //     { value: "male", label: "Male" },
  //     { value: "female", label: "Female" },
  //     { value: "Other", label: "Other" },
  //   ];

  return (
    <React.Fragment>
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
      <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
        <Paper
          variant="outlined"
          elevation={8}
          sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
        >
          <Typography
            component="h1"
            variant="h4"
            align="center"
            style={{ fontSize: "1.5rem", margin: "20px" }}
          >
            Educator Registration
          </Typography>
          <React.Fragment>
            <CssBaseline />
            <AppBar
              position="absolute"
              color="default"
              elevation={0}
              sx={{
                position: "relative",
                //   borderBottom: (t) => `1px solid ${t.palette.divider}`,
              }}
            ></AppBar>
            <Container component="main" maxWidth="md" sx={{ mb: 4 }}>
              <Grid container spacing={3} marginBottom={5}>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
                {/* <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="contactNumber"
                    name="contactNumber"
                    label="Contact Number"
                    fullWidth
                    autoComplete="tel"
                    variant="standard"
                  />
                </Grid> */}
                {/* <Grid item xs={12} sm={6}>
                  <FormControl fullWidth> */}
                {/* <InputLabel variant="standard" htmlFor="uncontrolled-native">
                    Gender
                </InputLabel> */}
                {/* <Select
                      label="Gender"
                      native
                      inputProps={{
                        name: "gender",
                        id: "uncontrolled-native",
                      }}
                    >
                      {arr.map((choose) => (
                        <option key={choose.value} value={choose.value}>
                          {choose.label}
                        </option>
                      ))}
                    </Select>
                  </FormControl> */}
                {/* </Grid> */}
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="university"
                    name="university"
                    label="University"
                    fullWidth
                    autoComplete="university"
                    variant="standard"
                    value={stateVar.Data.university}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="college"
                    name="college"
                    label="College"
                    fullWidth
                    autoComplete="college"
                    variant="standard"
                    value={stateVar.Data.college}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <TextField
                    required
                    id="designation"
                    name="designation"
                    label="Designation"
                    fullWidth
                    autoComplete="designation"
                    variant="standard"
                    value={stateVar.Data.designation}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
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
                <Grid item xs={12} sm={12}>
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  m: "5px",
                }}
              >
                <Button variant="contained" size="medium" sx={{ mt: 3, ml: 1 }} onClick={handleSubmit}>
                  Regsiter
                </Button>
              </Box>
            </Container>
          </React.Fragment>
        </Paper>
      </Container>
    </React.Fragment>
  );
}
