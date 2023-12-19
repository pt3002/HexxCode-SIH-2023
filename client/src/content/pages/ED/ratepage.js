import React, { useState } from "react";
import { useContext, useEffect } from "react";
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import Rating from "@material-ui/lab/Rating";
import { withStyles } from "@material-ui/core/styles";
import UserTokenContext from "../../../contexts/UserTokenContext";

const styles = {
  bg: {
    backgroundColor: "#001f3f", // Dark blue background color
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
  },
  table: {
    backgroundColor: "#000e1f", // Slightly darker shade for the table background
  },
  text: {
    color: "white",
  },
  lightButton: {
    backgroundColor: "orange", // Light color for the button
    color: "white",
  },
};

const CssTextFieldStyled = withStyles({
  root: {
    "& label": {
      color: "#aeaeae",
    },
    "& label.Mui-focused": {
      color: "#aeaeae",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#aeaeae",
      },
      "&:hover fieldset": {
        borderColor: "#8E1E12",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#8E1E12",
      },
      color: "white",
    },
  },
})(TextField);

const StyledRating = withStyles({
  iconEmpty: {
    color: 'white',
  },
})(Rating);

const TestComp = (props) => {
  const [feedbackVal1, setFeedbackVal1] = useState(3);
  const [feedbackVal2, setFeedbackVal2] = useState(3);
  const [feedbackVal3, setFeedbackVal3] = useState(3);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [err, setErr] = useState(false);
  const EDContext = useContext(UserTokenContext);
  const {dict, checkToken} = EDContext;

  const handleOnChangeData = ({ target }) => {
    setFeedbackMessage(target.value);
  };
  React.useEffect(() => {
    checkToken();
  }, []);
  const handleFeedback = async () => {
    // TODO: Check the Empty fields and Rating Should not be empty
    let l = [feedbackVal1, feedbackVal2, feedbackVal3, feedbackMessage];
    console.log(l);
    // Your feedback submission logic here
  };

  return (
    <div style={styles.bg}>
      <Typography variant="h1" align="center" style={styles.text}>
        Feedback
      </Typography>
      <br />
      <Typography variant="h4" align="center" style={styles.text}>
        Share your thoughts on the new curriculum.
      </Typography>
      <br />
      <Grid container alignItems="center" justifyContent="center">
        <TableContainer component={Paper} style={styles.table}>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography variant="h4" style={styles.text}>
                    Syllabus Relevance
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box component="fieldset" borderColor="transparent" mt={1}>
                    <StyledRating
                      name="feedback1"
                      value={feedbackVal1}
                      precision={0.5}
                      size="large"
                      onChange={(event, newValue) => {
                        setFeedbackVal1(newValue);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h4" style={styles.text}>
                    Application oriented
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box component="fieldset" borderColor="transparent" mt={1}>
                    <StyledRating
                      name="feedback2"
                      value={feedbackVal2}
                      precision={0.5}
                      size="large"
                      onChange={(event, newValue) => {
                        setFeedbackVal2(newValue);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography variant="h4" style={styles.text}>
                    Overall Rating
                  </Typography>
                </TableCell>
                <TableCell>
                  <Box component="fieldset" borderColor="transparent" mt={1}>
                    <StyledRating
                      name="feedback3"
                      value={feedbackVal3}
                      precision={0.5}
                      size="large"
                      onChange={(event, newValue) => {
                        setFeedbackVal3(newValue);
                      }}
                    />
                  </Box>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <CssTextFieldStyled
          name="feedback_message"
          required
          fullWidth
          multiline
          rows={5}
          id="feedback_message"
          label="Feedback"
          value={feedbackMessage}
          placeholder="Feel free to give your feedback on the curriculum"
          helperText={err && !feedbackMessage ? "Feedback Message is required" : ""}
          error={!feedbackMessage}
          onChange={handleOnChangeData}
          mb={2}
        />

        <Grid container justifyContent="space-between" alignItems="center" mt={2}>
          <Grid item sx={{ display: "flex", justifyContent: "flex-end" }}>
            <Button
              variant="containedInherit"
              sx={{ marginRight: 2 }}
              component="span"
              onClick={handleFeedback}
              // style={styles.lightButton}
            >
              Submit Feedback
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default TestComp;
