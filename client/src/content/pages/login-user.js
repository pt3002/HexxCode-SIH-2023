import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid"; //1
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Link from "@mui/material/Link";
import emailjs from "@emailjs/browser";
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
import bg from "../../theme/bg.jpg";
import GroupsIcon from "@mui/icons-material/Groups";
import SchoolIcon from "@mui/icons-material/School";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";

export default function CurriculumDeveloperLogin() {
  const navigate = useNavigate();
  const [user, setUser] = React.useState("");
  const [link, setLink] = React.useState("");
  const [notHead, setNotHead] = React.useState(true);
  const [dropDown, setDropDown] = React.useState(false);
  const [clicked, setClicked] = React.useState(null);
  const form = React.useRef();
  const location = useLocation();
  const [correctotp, setCorrectotp] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [otp, setOtp] = React.useState("");

  const [loading, setLoading] = React.useState(false);
  const [Data, setData] = React.useState({
    email: "",
    password: "",
    type: 0,
  });
  var o = Math.floor(100000 + Math.random() * 900000);

  const error = {};
  const userContext = useContext(UserTokenContext);
  const { dict, checkToken } = userContext;

  console.log(Data);

  const getDropDown = () => {
    setDropDown(true);
    setUser("Curriculum Developer");
    setLink("/register/page1");
    setClicked("cd");
    setData((prevData) => ({
      ...prevData,
      type: "1",
    }));
  };

  const getUser = (ev) => {
    const { name, value } = ev.currentTarget;

    setNotHead(true);
    if (value === "1") {
      setUser("Curriculum Developer");
      console.log(link);
      setNotHead(true);
    } else if (value === "2") {
      setUser("Educator");
      setLink("/register-educator");
      setDropDown(false);
      setNotHead(true);
      setClicked("ed");
    } else if (value === "3") {
      setDropDown(false);
      setUser("AICTE Administrator");
      setNotHead(true);
      setClicked("ad");
    } else {
      setLink("");

      setUser("Bureau");
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
    } else {
      return backendURL + "/DeptHead/DeptHeadLogin";
    }
  };

  const getPage = (type) => {
    if (type === "1") {
      return "/curriculumDeveloper/dahsboard";
    } else if (type === "2") {
      return "/ED/review";
    } else if (type === "3") {
      return "/aicte";
    } else {
      return "/deptHead/viewGroups";
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
      localStorage.clear();
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
            if (res.data.role == "CurriculumDeveloper") {
              Swal.fire({
                icon: "info",
                title: "INFO",
                text: "Two step verification, use email to send OTP",
                showConfirmButton: false,
                timer: 3000,
              });
              navigate("/otpscript", {
                state: {
                  body: body,
                },
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
              console.log("Login ls ", localStorage);
              navigate(navigate_page);
            }
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
    { value: "1", label: "Curriculum Developer" },
    { value: "4", label: "Bureau" },
  ];

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
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundImage: `url(${bg})`,
          backgroundSize: "cover",
        }}
      >
        <Container
          align="center"
          component="main"
          sx={{ nt: 3, mb: 2, width: 500, position: "relative", top: "3px" }}
        >
          <Grid
            container
            spacing={2}
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
                  backgroundColor: clicked === "cd" ? "#02263C" : "transparent",
                }}
              >
                {/* <Avatar
                  sx={{ width: 50, height: 50, mr: 1 }}
                  alt="Curriculum Developer"
                  src="./static/images/avatars/cd2.png"
                /> */}
                <GroupsIcon
                  sx={{ width: 50, height: 50, mr: 1, color: "white" }}
                />
                <Typography
                  variant="caption"
                  align="center"
                  style={{ color: "white" }}
                >
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
                  backgroundColor: clicked === "ed" ? "#02263C" : "transparent",
                }}
              >
                {/* <Avatar
                  sx={{ width: 50, height: 50, mr: 1 }}
                  alt="Educator"
                  src="./static/images/avatars/edu.jpg"
                /> */}
                <SchoolIcon
                  sx={{ width: 50, height: 50, mr: 1, color: "white" }}
                />
                <Typography
                  variant="caption"
                  align="center"
                  style={{ color: "white" }}
                >
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
                  backgroundColor: clicked === "ad" ? "#02263C" : "transparent",
                }}
              >
                {/* <Avatar
                  sx={{ width: 50, height: 50, mr: 1 }}
                  alt="AICTE Administrator"
                  src="./static/images/avatars/admin1.png"
                  style={{color:"white"}}
                /> */}
                <AdminPanelSettingsIcon
                  sx={{ width: 50, height: 50, mr: 1, color: "white" }}
                />
                <Typography
                  variant="caption"
                  align="center"
                  style={{ color: "white" }}
                >
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
            <Grid
              align="center"
              sx={{ mt: 1, mb: 1, display: "flex", flexDirection: "row" }}
            >
              <img
                src="./static/images/logo/Shiksha.png"
                alt="Shiksha-Niyojak"
                height="70"
                style={{
                  margin: "2%",
                }}
              />
              <Grid
                align="left"
                sx={{
                  margin: "2%",
                  display: "flex",
                  flexDirection: "column",
                  width: "50%",
                }}
              >
                <Typography
                  variant="h2"
                  style={{ color: "#02263C", margin: "2%" }}
                >
                  शिक्षा नियोजक
                </Typography>
                <Typography
                  variant="h4"
                  style={{ color: "#02263C", margin: "2%" }}
                >
                  Shiksha Niyojak
                </Typography>
              </Grid>
              <img
                src="./static/images/logo/aicte.jpg"
                alt="aicte"
                height="70"
                style={{ margin: "2%" }}
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
                  value={Data.type || "1"}
                  // fullWidth={true}
                  size="small"
                  onChange={handleLogin}
                  sx={{ width: 400, height: 56 }}
                >
                  {/* {role_arr.map((option) => (
                    <MenuItem key={option.value} value={option.value} defaultValue={option.value === 'Curriculum Developer' ? 'Curriculum Developer' : "Curriculum Developer"}>
                      {option.label}
                    </MenuItem>
                  ))} */}
                   <MenuItem key="1" value="1" selected >
                      Curriculum Developer
                    </MenuItem>
                   <MenuItem key="4" value="4">
                      Bureau
                    </MenuItem>
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
