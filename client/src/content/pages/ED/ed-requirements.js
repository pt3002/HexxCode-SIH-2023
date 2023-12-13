import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import { backendURL } from "../../../configKeys";
import { fDate } from "../../../utils/formatTime";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Navigate, useNavigate } from "react-router-dom";
import { useContext, useEffect } from 'react';
import axios from "axios";
import Swal from "sweetalert2";
import UserTokenContext from '../../../contexts/UserTokenContext';

const uuid = require("uuid").v4;

export default function PostRequirements() {
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const [req, setReq] = React.useState([]);
  const userContext = useContext(UserTokenContext)
  const {dict, checkToken} = userContext
  const educatorId = "1d56470c-f488-4103-a285-86cc8592ec7b";

  const [Data, setData] = React.useState({
    department: "",
    subject: "",
    suggestions: "",
  });

  const [errors, setErrors] = React.useState({});

  const handleChange = (ev) => {
    const { name, value } = ev.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(Data);
  };

  const handleClickOpen = () => {
    setData({
      department: "",
      subject: "",
      suggestions: "",
    });
    setOpen(true);
  };

  const handleClose = () => {
    // console.log(newDepartmentHead);
    setOpen(false);
  };

  const handlePostRequirement = (event) => {
    event.preventDefault();
    // let Data = Data;
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
    let validate = true;

    Object.keys(errors).map((error) => {
      if (errors[error] !== "") {
        validate = false;
      }
    });
    if (validate == true) {
      console.log("All data is correctly filled", Data);
      const initial_url = backendURL + "/Educator/postRequirement";
      let body = {
        id: uuid(),
        department: Data.department,
        subject: Data.subject,
        educator_id: educatorId,
        requirement_text: Data.suggestions,
      };

      axios
        .post(initial_url, body, {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        })
        .then((res) => {
          if (res.data.message === "This User Cannot Post Requirement") {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
          } else {
            Swal.fire({
              icon: "success",
              title: "SUCCESS",
              text: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            })
            // console.log("UserTokenContext",UserTokenContext);
            // console.log("dict",dict);
          }
        })
        .catch((error) => {
          console.log("Error Code: ", error);
          navigate("/ED/requirements");
        });
      handleClose();
    } else {
      console.log(errors);
      alert("Please fill all data correctly");
      handleClose();
    }
  };

  const card = req.map((item) => (
    <React.Fragment>
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography fontSize={18} gutterBottom sx={{ mb: 2 }}>
            <strong>Department : </strong> {item.department}
          </Typography>
          <Typography fontSize={18} component="div" sx={{ mb: 2 }}>
            <strong>Subject : </strong>
            {item.subject}
          </Typography>
          <Typography fontSize={18} sx={{ mb: 1.5 }}>
            <strong>Suggested Requirement : </strong>
            <p>{item.requirement_text}</p>
          </Typography>
        </CardContent>
      </Card>
    </React.Fragment>
  ));

  const arr = [
    { value: "Computer Engineering", label: "Computer Engineering" },
    { value: "ENTC", label: "ENTC" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Chemical Engineering", label: "Chemical Engineering" },
    { value: "Civil Engineering", label: "Civil Engineering" },
    { value: "Mechanical Engineering", label: "Mechanical Engineering" },
    {
      value: "Manufacturing and Production Engineering",
      label: "Manufacturing and Production Engineering",
    },
  ];
  const subjects = {
    "Computer Engineering": [
      { value: "DSA", label: "DSA" },
      { value: "CN", label: "CN" },
    ],
    ENTC: [
      { value: "sub1", label: "sub1" },
      { value: "sub2", label: "sub2" },
    ],
    "Electrical Engineering": [
      { value: "sub4", label: "sub4" },
      { value: "sub3", label: "sub3" },
    ],
    "Chemical Engineering": [
      { value: "sub5", label: "sub5" },
      { value: "sub6", label: "sub6" },
    ],
    "Civil Engineering": [
      { value: "sub8", label: "sub8" },
      { value: "sub7", label: "sub7" },
    ],
    "Mechanical Engineering": [
      { value: "sub9", label: "sub9" },
      { value: "sub10", label: "sub10" },
    ],
    "Manufacturing and Production Engineering": [
      { value: "sub11", label: "sub11" },
      { value: "sub12", label: "sub12" },
    ],
  };

  React.useEffect(() => {
    axios.get(`${backendURL}/Educator/getEducatorRequirements`,{
      headers: {
        "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
      },
    }).then((res) => {
      setReq(res.data.requirements);
    });
  }, []);

  return (
    <>
      <Button
        variant="contained"
        sx={{ margin: "2%" }}
        size="large"
        onClick={() => {
          //   setEdit(0);
          handleClickOpen();
        }}
        startIcon={<AddCircleSharpIcon />}
      >
        Post New Requirement
      </Button>

      <Box sx={{ height: 400, width: "96%", margin: "2%" }}>{card}</Box>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Post New Requirement</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText> */}

          <Grid container spacing={3} marginBottom={5}>
            <Grid item xs={12}>
              <TextField
                label="Department"
                select
                color="primary"
                variant="outlined"
                name="department"
                fullWidth={true}
                size="small"
                value={Data.department}
                onChange={handleChange}
                sx={{ mt: 1 }}
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
                label="Subject"
                select
                color="primary"
                variant="outlined"
                name="subject"
                fullWidth={true}
                size="small"
                value={Data.subject}
                onChange={handleChange}
              >
                {Data.department && subjects[Data.department] ? (
                  subjects[Data.department].map((option) => (
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
                value={Data.suggestions}
                onChange={handleChange}
                style={{
                  padding: "10px",
                  fontSize: "16px",
                  border: "1px solid #ccc",
                  borderRadius: "5px",
                  width: "100%",
                  boxSizing: "border-box",
                  minHeight: "100px",
                  marginTop: "10px",
                }}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handlePostRequirement}>Add</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
