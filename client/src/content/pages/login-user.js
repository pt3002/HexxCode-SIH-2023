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
import MenuItem from "@mui/material/MenuItem";
import Footer from "../../components/Footer";
import { backendURL } from "../../configKeys";
import Swal from "sweetalert2";
import axios from "axios";
import UserTokenState from "../../contexts/UserTokenState";
import UserTokenContext from "../../contexts/UserTokenContext";
import { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function CurriculumDeveloperLogin() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState("");
  const [link, setLink] = React.useState("");
  const [notHead, setNotHead] = React.useState(true);
  const [dropDown, setDropDown] = React.useState(false);
  const [clicked, setClicked] = React.useState(null);
  const [Data, setData] = React.useState({
    email: "",
    password: "",
    type: 0,
  });

  const error = {};
  const userContext = useContext(UserTokenContext)
  const {dict, checkToken} = userContext;

  const getDropDown = () => {
    setDropDown(true);
    setUser("");
    setClicked("cd")
  };

  const getUser = (ev) => {
    const { name, value } = ev.currentTarget;

    setNotHead(true);
    if (value === "1") {
      setUser("Curriculum Developer");
      setLink("/register/page1");
      setNotHead(true);
    } else if (value === "2") {
      setUser("Educator");
      setLink("/register-educator");
      setDropDown(false);
      setNotHead(true);
      setClicked("ed")
    } else if (value === "3") {
      setDropDown(false);
      setUser("AICTE Administrator");
      setNotHead(true);
      setClicked("ad")
    } else {
      setLink("");
      setUser("Deptartment Head");
      setNotHead(false);
    }
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = (ev) => {
    const { name, value } = ev.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (value === "1" || value === "4") {
      getUser({ currentTarget: { name, value } });
    }
  };

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const getUrlForUser = (type) => {
    if (type === "1") {
      return backendURL + "/CurriculumDeveloper/CurriculumDeveloperLogin";
    } else if (type === "2") {
      return backendURL + "/Educator/EducatorLogin";
    } else if (type === "3") {
      return backendURL + "/AICTEAdmin/AICTEAdminLogin";
    }else {
      return backendURL + "/DeptHead/DeptHeadLogin";
    }
  };

  const getPage = (type) => {
    if (type === "1") {
      return "/curriculumDeveloper";
    } else if (type === "2") {
      return "/ED";
    } else if (type === "3"){
      return "/aicte";
    } else {
      return "/deptHead";
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
            });
            let token_dict = res.data.token;
            localStorage.setItem("shiksha-niyojak", token_dict.token);
            localStorage.setItem("shiksha-niyojak-role", res.data.role);
            checkToken()
            console.log("Login ls ", localStorage);
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

  const role_arr = [
    { value: "1", label: "Cirriculum Developer" },
    { value: "4", label: "Department Head" },
  ];

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
            container
            align="center"
            sx={{
              display: "flex",
              justifyContent: "center",
              p: { xs: 2, md: 2 },
            }}
          >
            <Grid item xs={12} md={4}>
              <Button
                variant="text"
                clicked
                onClick={getDropDown}
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: clicked === 'cd' ? '#e0e6e8' : 'transparent',
                }}
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="text"
                onClick={getUser}
                name="type"
                value="2"
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: clicked === 'ed' ? '#e0e6e8' : 'transparent',
                }}
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Button
                variant="text"
                onClick={getUser}
                name="type"
                value="3"
                sx={{
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  height: "100%",
                  backgroundColor: clicked === 'ad' ? '#e0e6e8' : 'transparent',
                }}
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
              {user && (
                <Typography variant="h2" align="center">
                  {user}
                </Typography>
              )}
              <Typography variant="h2" align="center" sx={{ marginTop: 1 }}>
                Sign In
              </Typography>
            </Grid>
            {dropDown && (
              <Grid item xs={12} sm={6} sx={{ mt: 1 }}>
                <TextField
                  label="Select Role"
                  select
                  color="primary"
                  variant="outlined"
                  name="type"
                  value={Data.type}
                  // fullWidth={true}
                  size="small"
                  onChange={handleLogin}
                  sx={{ width: 400, height: 56 }}
                >
                  {role_arr.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
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

            {notHead && (
              <Typography
                variant="h6"
                color="inherit"
                align="center"
                noWrap
                sx={{ mx: { xs: 7, md: 6 }, mt: 2, fontSize: 12 }}
              >
                Don't have an account?
                <Link href={link} color="secondary">
                  Click to Register
                </Link>
              </Typography>
            )}
          </Paper>
        </Container>
        <Footer />
      </div>

      {/* </Box> */}
    </React.Fragment>
  );
}
