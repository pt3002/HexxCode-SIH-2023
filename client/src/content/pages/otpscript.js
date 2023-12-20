import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import { useLocation } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { backendURL } from "../../configKeys";
import axios from "axios";
import Button from "@mui/material/Button";
import { Navigate, useNavigate } from "react-router-dom";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import bg_pic from "../../theme/bg.jpg";
import Swal from "sweetalert2";

export const OtpScript = () => {
  const form = useRef();
  const location = useLocation();
  const navigate = useNavigate();
  const [correctotp, setCorrectotp] = useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const [loading, setLoading] = React.useState(false);

  // Setting correct otp
  var o = Math.floor(100000 + Math.random() * 900000);

  const handleClickOpen = () => {
    setOpen(true);
    if (otp) {
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOTPChange = (event) => {
    setOtp(event.target.value);
  };

  const handleSubmit = (e) => {
    const url = backendURL + "/curriculumDeveloper/checkAndLogin";
    let data = location.state.body;
    if (otp === correctotp + "") {
      axios
        .post(url, data)
        .then((res) => {
            Swal.fire({
                icon: "success",
                title: "SUCCESS",
                text: res.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
            let token_dict = res.data.token;
            localStorage.setItem("shiksha-niyojak", token_dict.token);
            localStorage.setItem("shiksha-niyojak-role", res.data.role);
            console.log("Login ls ", localStorage);
          navigate("/curriculumDeveloper/dashboard");
        })
        .catch((res) => {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: res.data.message,
                showConfirmButton: false,
                timer: 3000,
              });
          navigate("/login");
        });
    } else {
        Swal.fire({
            icon: "error",
            title: "ERROR",
            text: "Incorrect OTP",
            showConfirmButton: false,
            timer: 3000,
          });
      navigate("/login");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    if (location.state.body) {
      setCorrectotp(o);
      setLoading(true);
      emailjs
        .sendForm(
          "service_6wjn715", // service id
          "template_x77v08c", // template id
          form.current,
          "IWz8BxDawjTZYvnbQ" // public api key
        )
        .then(
          (result) => {
            Swal.fire({
                icon: "info",
                title: "INFO",
                text: "Email sent, check for OTP",
                showConfirmButton: false,
                timer: 3000,
              });
            setLoading(false);
          },
          (error) => {
            Swal.fire({
                icon: "error",
                title: "ERROR",
                text: error.text,
                showConfirmButton: false,
                timer: 3000,
              });
          }
        );
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
          position: "relative",
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      ></AppBar>
    <div
      style={{
        backgroundImage: `url(${bg_pic})`,
        top: "0px",
        right: "0px",
        bottom: "0px",
        left: "0px",
        margin:"0px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        minHeight: "100vh",
        backgroundColor: "#767676"
      }}>
      <Container
        component="main"
        maxWidth="sm"
        style={{
          backgroundColor: "black",
          borderRadius: "12px",
          opacity: 1,
          border: "solid 2px gold",
        }}>
        <Typography component="h4" variant="h4" color="white" p={1}>
          Please Verify your details
        </Typography>
        <Typography component="h4" variant="h4" color="white" p={1}>
          After OTP Verification these details cannot be modified
        </Typography>
        <form
          ref={form}
          onSubmit={sendEmail}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}>
          <div
            style={{
              margin: "8px",
              fontSize: "24px",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              justifyContent: "space-evenly",
              alignItems: "start",
              backgroundColor: "rgba(0, 0, 0)",
              padding: "10px",
              borderRadius: "8px",
            }}>
            <label color="white">Email</label>
            <input
              type="email"
              name="user_email"
              value={location.state.body.email}
              style={{
                fontSize: "24px",
                // borderRadius: "8px",
                border: "solid 2px gold",
                padding: "4px",
              }}
            />
          </div>
          <label style={{ display: "none" }}>OTP</label>
          <input name="user_otp" value={o} style={{ display: "none" }} />
          {!loading && (
            <input
              style={{
                fontSize: "24px",
                // backgroundColor: "#feca0a",
                color: "rgba(255, 255, 255)",
                borderRadius: "4px",
                // borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                padding: "10px 15px",
                textAlign: "center",
                transition: "200ms",
                width: "100%",
                boxSizing: "border-box",
                backgroundColor: "rgba(0, 0, 0)",
                border: "solid 2px gold",
                fontSize: "16px",
                userSelect: "none",
                lineHeight: "28px",
              }}
              type="submit"
              value="Send Email"
            />
          )}
          {loading && (
            <Button
              style={{
                fontSize: "24px",
                backgroundColor: "rgba(0, 0, 0)",
                color: "rgba(255, 255, 255)",
                borderRadius: "4px",
                // borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                padding: "10px 15px",
                textAlign: "center",
                transition: "200ms",
                width: "100%",
                boxSizing: "border-box",
                border: "solid 2px gold",
                fontSize: "16px",
                userSelect: "none",
                touchAction: "manipulation",
                margin: "10px",
              }}
              onClick={() => handleClickOpen()}>
              Sending Email Please Wait
            </Button>
          )}
          <Button
            style={{
              fontSize: "24px",
              backgroundColor: "rgba(0, 0, 0)",
              color: "rgba(255, 255, 255)",
              borderRadius: "4px",
            //   borderRadius: "12px",
              cursor: "pointer",
              fontWeight: "bold",
              padding: "10px 15px",
              textAlign: "center",
              transition: "200ms",
              width: "100%",
              boxSizing: "border-box",
              border: "solid 2px gold",
              fontSize: "16px",
              userSelect: "none",
              touchAction: "manipulation",
              margin: "10px",
            }}
            onClick={() => handleClickOpen()}>
            Enter OTP
          </Button>

          <Dialog open={open} onClose={() => handleClose()}>
            <DialogTitle>Subscribe</DialogTitle>
            <DialogContent>
              <DialogContentText>
                To register, please enter OTP you recieved on your email ID
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="OTP"
                fullWidth
                variant="standard"
                onChange={handleOTPChange}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleClose()}>Cancel</Button>
              <Button onClick={() => handleSubmit()}>Submit OTP</Button>
            </DialogActions>
          </Dialog>
        </form>
      </Container>
    </div>
    </React.Fragment>
  );
};
