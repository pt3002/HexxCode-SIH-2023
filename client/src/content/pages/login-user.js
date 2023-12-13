import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid"; //1
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import { Avatar, ButtonGroup, Box } from "@mui/material";
import Footer from "../../components/Footer";
import { backendURL } from "../../configKeys";
import Swal from "sweetalert2";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";

export default function CurriculumDeveloperLogin() {
  console.log(backendURL);
  const navigate = useNavigate();

  const [text, setUser] = React.useState("");

  const [Data, setData] = React.useState({
    email: "",
    password: "",
    type: 0,
  });

  const error = {};

  const getUser = (ev) => {
    const { name, value } = ev.currentTarget;
    if (value === "1") {
      // setType(1);
      setUser("Curriculum Developer");
    } else if (value === "2") {
      // setType(2);
      setUser("Educator");
    } else {
      // setType(3);
      setUser("AICTE Administrator");
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    console.log(text);
  };

  const handleLogin = (ev) => {
    const { name, value } = ev.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  // const validateUsertype = (type, email) => {
  //   if (users.some((user) => user.email === email && user.type === type)) {
  //     return true;
  //   }
  //   return false;
  // };

  const getUrlForUser = (type) => {
    if (type === "1") {
      return backendURL + "/CurriculumDeveloper/CurriculumDeveloperLogin";
    } else if (type === "2") {
      // return BACKEND_URL + "/Educator/EducatorLogin";
      return backendURL + "/Educator/EducatorLogin";
    } else {
      return backendURL + "/AICTEAdmin/AICTEAdminLogin";
    }
  };

  const getPage = (type) => {
    if (type === "1") {
      return "/curriculumDeveloper";
    } else if (type === "2") {
      return "/ED";
    } else {
      return "/aicte";
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let errors = error;
    if (Data.type === 0) {
      error["type"] = "user not selected";
    }
    if (Data.email === "") {
      errors["email"] = "All Details to be filled";
    } else if (!validateEmail(Data.email)) {
      errors["email"] = "Invalid email";
    } else {
      errors["email"] = "";
    }
    if (Data.password === "") {
      errors["password"] = "All Details to be filled";
    } else {
      errors["password"] = "";
    }

    let validate = true;
    Object.keys(errors).map((error) => {
      if (errors[error] !== "") {
        validate = false;
      }
    });

    if (validate) {
      console.log("All Details filled correctly.");
      const initial_url = getUrlForUser(Data.type);
      const navigate_page = getPage(Data.type);
      console.log(initial_url);
      let body = { email: Data.email, password: Data.password };
      axios
        .post(initial_url, body)
        .then((res) => {
          if (
            res.data.message === "Wrong user selected or Invalid Credentials"
          ) {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: res.data.message,
              showConfirmButton: false,
              timer: 3000,
            });
          } else if (res.data.error === "Invalid Credentials") {
            Swal.fire({
              icon: "error",
              title: "ERROR",
              text: res.data.error,
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
            let token_dict = res.data.token;
            console.log("Login page token: ",token_dict)
            localStorage.setItem("shiksha-niyojak", token_dict.token);
            navigate(navigate_page);
          }
        })
        .catch((error) => {
          console.log("Error Code: ", error);
          navigate("/login");
        });
    } else {
      console.log(errors);
      alert("Please fill all data first");
    }
  };

  return (
    <React.Fragment>
      {/* <Box
  sx={{
    backgroundImage: 'url(./static/images/bg.jpg)',
    top: '0px',
    right: '0px',
    bottom: '0px',
    left: '0px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
    minHeight: '100vh',
    backgroundColor: '#767676',
  }}> */}
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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Container
          align="center"
          component="main"
          sx={{ nt: 3, mb: 2, width: 500, position: "relative", top: "3px" }}
        >
          <Grid align="center" sx={{ mt: 2.5 }}>
            <Typography component="h1" variant="h2" align="center">
              Select User
            </Typography>
          </Grid>

          <Grid
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: { xs: 2, md: 2 },
            }}
          >
            <Button
              variant="text"
              onClick={getUser}
              name="type"
              value="1"
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Avatar
                sx={{ width: 50, height: 50, mr: 1 }}
                alt="Curriculum Developer"
                src="./static/images/avatars/cd2.png"
              />
              <Typography variant="caption" align="center">
                Curriculum Developer
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={getUser}
              name="type"
              value="2"
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Avatar
                sx={{ width: 50, height: 50, mr: 1 }}
                alt="Educator"
                src="./static/images/avatars/edu.jpg"
              />

              <Typography variant="caption" align="center">
                Educator
              </Typography>
            </Button>
            <Button
              variant="text"
              onClick={getUser}
              name="type"
              value="3"
              sx={{ flexDirection: "column", alignItems: "center" }}
            >
              <Avatar
                sx={{ width: 50, height: 50, mr: 1 }}
                alt="AICTE Administrator"
                src="./static/images/avatars/admin1.png"
              />
              <Typography variant="caption" align="center">
                AICTE Administrator
              </Typography>
            </Button>
          </Grid>

          <Paper
            align="center"
            variant="outlined"
            elevation={8}
            sx={{
              my: { xs: 4, md: 2 },
              p: { xs: 2, md: 3 },
              borderRadius: 2.5,
            }}
          >
            <Grid align="center" sx={{ mt: 1, mb: 1 }}>
              <img
                src="./static/images/logo/logo_new.png"
                alt="aicte"
                height="70"
              />
            </Grid>

            <Grid align="center">
              {/* <Avatar sx={{width: 56, height: 56}} ><AccountCircleIcon /></Avatar> */}
              {text && (
                <Typography variant="h2" align="center">
                  {text}
                </Typography>
              )}
              <Typography variant="h2" align="center" sx={{ marginTop: 1 }}>
                Sign In
              </Typography>
            </Grid>

            <Grid align="center" item xs={12} sm={6} sx={{ mt: 1 }}>
              <TextField
                required
                id="email"
                name="email"
                label="Email"
                autoComplete="email"
                value={Data.email}
                onChange={handleLogin}
                sx={{ width: 400, height: 56 }}
              />
            </Grid>

            <Grid align="center" item xs={12} sm={6} sx={{ mt: 2 }}>
              <TextField
                required
                type="password"
                id="password"
                name="password"
                label="Password"
                sx={{ width: 400, height: 56 }}
                value={Data.password}
                onChange={handleLogin}
              />
            </Grid>

            <Typography
              variant="h6"
              color="inherit"
              align="right"
              noWrap
              sx={{
                mx: { xs: "auto", md: "auto" },
                mt: 1,
                fontSize: 12,
                mr: 1,
              }}
            >
              <Link href="#" color="secondary">
                Forgot Password?
              </Link>
            </Typography>

            <Grid align="center" item xs={12} sm={6} sx={{ mt: 1 }}>
              {/* <Button type="submit"  variant="contained" sx={{width: 400, height: 46,bgcolor:'#ff865b'}} onClick={handleSubmit}>
                            Sign In
                        </Button> */}
              <Button variant="contained" size="medium" onClick={handleSubmit}>
                Sign In
              </Button>
            </Grid>

            <Typography
              variant="h6"
              color="inherit"
              align="center"
              noWrap
              sx={{ mx: { xs: 7, md: 6 }, mt: 2, fontSize: 12 }}
            >
              Don't have and account?
              <Link href="/register" color="secondary">
                Click to Regsiter
              </Link>
            </Typography>
          </Paper>
        </Container>
        <Footer />
      </div>

      {/* </Box> */}
    </React.Fragment>
  );
}
