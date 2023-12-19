import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Rating from "@material-ui/lab/Rating";
import TextField from '@mui/material/TextField';
import { withStyles } from "@material-ui/core/styles";
import {
    Button,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
  } from "@mui/material";
import axios from "axios";
import Swal from "sweetalert2";
import { backendURL } from "../../../configKeys";
import { Navigate, useNavigate } from "react-router-dom";

const uuid = require("uuid").v4;

export default function EducatorFeedback() {
  const navigate = useNavigate();
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedback,setFeedback]=useState({
    criteria1:{
      c1:3,
      c2:3,
      c3:3,
      c4:3,
      c5:3,
    },
    criteria2:{
      c1:3,
      c2:3,
      c3:3,
      c4:3,
      c5:3,
    },
    criteria3:{
      c1:3,
      c2:3,
      c3:3,
      c4:3,
      c5:3,
    },
    criteria4:{
      c1:3,
      c2:3,
      c3:3,
      c4:3,
      c5:3,
    },
    criteria5:{
      c1:3,
      c2:3,
      c3:3,
      c4:3,
      c5:3,
    },
  });
  // const [error,setError]=useState([]);
  // const [err, setErr] = useState(false);

  const handleOnChangeData = ({ target }) => {
    setFeedbackMessage(target.value);
  };

const handleSubmit=(event)=>{
  event.preventDefault();
  if(feedbackMessage===""){
    alert("please fill the feedback message as well");
  }
  else{
    let crt1=`${feedback["criteria1"].c1}#${feedback["criteria1"].c2}#${feedback["criteria1"].c3}#${feedback["criteria1"].c4}#${feedback["criteria1"].c5}#`;
    let crt2=`${feedback["criteria2"].c1}#${feedback["criteria2"].c2}#${feedback["criteria2"].c3}#${feedback["criteria2"].c4}#${feedback["criteria2"].c5}#`;
    let crt3=`${feedback["criteria3"].c1}#${feedback["criteria3"].c2}#${feedback["criteria3"].c3}#${feedback["criteria3"].c4}#${feedback["criteria3"].c5}#`;
    let crt4=`${feedback["criteria4"].c1}#${feedback["criteria4"].c2}#${feedback["criteria4"].c3}#${feedback["criteria4"].c4}#${feedback["criteria4"].c5}#`;
    let crt5=`${feedback["criteria5"].c1}#${feedback["criteria5"].c2}#${feedback["criteria5"].c3}#${feedback["criteria5"].c4}#${feedback["criteria5"].c5}#`;
    
    const url=backendURL+"/Educator/postFeedback";
    let body = {
      id: uuid(),
      subject_id:Math.ceil(Math.random()*4),
      quality_content: crt1,
      utility_content: crt2,
      affectiveness: crt3,
      goals: crt4,
      evaluation: crt5,
      feedback_message: feedbackMessage,
    };
    axios
        .post(url, body, {
          headers: {
            "shiksha-niyojak": localStorage.getItem("shiksha-niyojak"),
          },
        })
        .then((res) => {
          if (res.data.message === "This User Cannot Post Feedback") {
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
            }).then(navigate("/ED/review"));
            // console.log("UserTokenContext",UserTokenContext);
            // console.log("dict",dict);
          }
        })
        .catch((error) => {
          console.log("Error Code: ", error);
        });
    
  }
}

console.log("feedback...",feedback);

  const arr = [
    {
      id: "criteria1",
      title: "Quality of Curriculum Content",
      c1: "Accessibility",
      c2: "Accuracy and Timeliness",
      c3: "Objectivity",
      c4: "Scope and Sequence of topics coverd",
      c5: "Comprehensive",
    },
    {
      id: "criteria2",
      title: "Utility of Curriculum Content",
      c1: "Supports Cognitive Development",
      c2: "Problem-Solving",
      c3: "Promotes Development of Executive Functioning",
      c4: "Differentiated Instruction for Diverse Populations",
      c5: "Clearly Specifies Learning Goals",
    },
    {
      id: "criteria3",
      title: " Affectiveness",
      c1: "Instructional supports",
      c2: "Self Efficacy",
      c3: "Engagement",
      c4: "Encourages Innovation and Research",
      c5: "Flexibilty",
    },
    {
      id: "criteria4",
      title: "Goals and outcomes",
      c1: "Meet Requirements",
      c2: "Ease of Monitoring Student Progress",
      c3: "Syntactic Correctness",
      c4: "Relevance",
      c5: "Progressive and Balanced",
    },
    {
      id: "criteria5",
      title: "Evaluation",
      c1: "Credit Distribution",
      c2: "Appropriateness of the Marking Scheme.",
      c3: "Pratical Knowledge Assessment",
      c4: "Time Distribution for Every Subject",
      c5: "Assessment Methods",
    },
  ];

  const StyledRating = withStyles({
    iconEmpty: {
        color:"grey",
    },
  })(Rating);


  return (
    <>
      <Box sx={{ m: 5, maxHeight: "500px", overflowY: "auto" }}>
        <Typography component="h1" variant="h2" align="center">
          Fill out the feedback below
        </Typography>
      </Box>
      <Box sx={{ m: 5, maxHeight: "500px", overflowY: "auto" }}>
        <Box sx={{ width: "100%" }}>
          {arr.map((criteria, index) => (
            <Accordion
              // key={criteria.id}
              sx={{
                mb: 2,
                backgroundColor: index % 2 === 0 ? "#f5f5f5" : "white",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                transition: "box-shadow 0.3s ease-in-out",
                "&:hover": {
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                },
              }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls={`panel${index + 1}a-content`}
                id={`panel${index + 1}a-header`}
              >
                <Typography fontWeight="bold">
                  {index + 1} : {criteria.title}
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container alignItems="center" justifyContent="center">
                  <TableContainer >
                    <Table>
                      <TableBody>
                        <TableRow size="small">
                          <TableCell>
                            <Typography >
                              {criteria.c1}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="fieldset"
                              borderColor="transparent"
                              mt={1}
                            >
                              <StyledRating
                                name={`${criteria.id}-c1`}
                                borderColor="black"
                                value={feedback[criteria.id]["c1"]}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                  console.log(event);
                                  const [criterionId, property] = event.target.name.split('-');
                                  setFeedback((prevFeedback) => ({
                                    ...prevFeedback,
                                    [criterionId]: {
                                      ...prevFeedback[criterionId],
                                      [property]: newValue,
                                    },
                                  }));
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell>
                            <Typography>
                              {criteria.c2}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="fieldset"
                              borderColor="transparent"
                              mt={1}
                            >
                              <StyledRating
                                name={`${criteria.id}-c2`}
                                value={feedback[criteria.id]["c2"]}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                  console.log(criteria.id);
                                  const [criterionId, property] = event.target.name.split('-');
                                  setFeedback((prevFeedback) => ({
                                    ...prevFeedback,
                                    [criterionId]: {
                                      ...prevFeedback[criterionId],
                                      [property]: newValue,
                                    },
                                  }));
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell> 
                            <Typography>
                             {criteria.c3}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="fieldset"
                              borderColor="transparent"
                              mt={1}
                            >
                              <StyledRating
                                name={`${criteria.id}-c3`}
                                value={feedback[criteria.id]["c3"]}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                  console.log(feedback[criteria.id]);
                                  const [criterionId, property] = event.target.name.split('-');
                                  setFeedback((prevFeedback) => ({
                                    ...prevFeedback,
                                    [criterionId]: {
                                      ...prevFeedback[criterionId],
                                      [property]: newValue,
                                    },
                                  }));
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell> 
                            <Typography>
                             {criteria.c4}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="fieldset"
                              borderColor="transparent"
                              mt={1}
                            >
                              <StyledRating
                                name={`${criteria.id}-c4`}
                                value={feedback[criteria.id]["c4"]}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                  console.log(event);
                                  const [criterionId, property] = event.target.name.split('-');
                                  setFeedback((prevFeedback) => ({
                                    ...prevFeedback,
                                    [criterionId]: {
                                      ...prevFeedback[criterionId],
                                      [property]: newValue,
                                    },
                                  }));
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell> 
                            <Typography>
                             {criteria.c5}
                            </Typography>
                          </TableCell>
                          <TableCell>
                            <Box
                              component="fieldset"
                              borderColor="transparent"
                              mt={1}
                            >
                              <StyledRating
                                name={`${criteria.id}-c5`}
                                value={feedback[criteria.id]["c5"]}
                                precision={0.5}
                                size="small"
                                onChange={(event, newValue) => {
                                  console.log(event);
                                  const [criterionId, property] = event.target.name.split('-');
                                  setFeedback((prevFeedback) => ({
                                    ...prevFeedback,
                                    [criterionId]: {
                                      ...prevFeedback[criterionId],
                                      [property]: newValue,
                                    },
                                  }));
                                }}
                              />
                            </Box>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </AccordionDetails>
            </Accordion>
          ))
          }
         
          <TextField
          name="feedback_message"
          fullWidth
          multiline
          required
          rows={5}
          id="feedback_message"
          label="Feedback"
          value={feedbackMessage}
          placeholder="Feel free to give your feedback on the curriculum"
          onChange={handleOnChangeData}
          mb={2}
        />
        </Box>
        <Grid container justifyContent="center" alignItems="center" mt={2}>
          <Grid item sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              sx={{ marginRight: 2 }}
              component="span"
              align="center"
              onClick={handleSubmit}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
