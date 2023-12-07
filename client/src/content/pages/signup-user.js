import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';//1
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Link from '@mui/material/Link';
import { Avatar ,Alert,AlertTitle} from '@mui/material';

export default function CurriculumDeveloperSignUp() {
    const [Data, setData] = React.useState({
        email: '',
        password: '',
        confirmPassword:'',
    });

    const [showErrorAlert, setShowErrorAlert] = React.useState(false);

    const user={};
    // const [email, setEmail] = React.useState('')
    

    const handleSignUp = (ev) => {
        const { name, value } = ev.target;
        setData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    // const handleSubmit = () => {
    //     console.log('Logged In Successfully : ', Data);
    // };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (Data.password !==Data.confirmPassword){
            console.log("password not same.");
            // setShowErrorAlert(true);
            // setTimeout(()=>{
            //     setShowErrorAlert(false);
            // },5000);
        }
        else{
            console.log("Created User Successfully : ",Data);
        }
        
      };
    return(
        
        <React.Fragment>
            <CssBaseline />
            {showErrorAlert && (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          Password does not match. Please try again.
        </Alert>
      )}
            <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                  position: 'relative',
                  borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            
            </AppBar>

            <Container component="main"  sx={{ mb: 4 ,width: 500}}  direction="column">
                 <Paper variant="outlined" sx={{ my: { xs: 7, md: 6 }, p: { xs: 2, md: 3 },borderRadius: 2.5}} >

                 <Grid align="center" sx={{mt: 1,mb:4}}>
                <img src="./static/images/logo/logo_new.png" alt="aicte" />
                </Grid>

                    <Grid align="center">
                    {/* <Avatar sx={{width: 56, height: 56}} ><AccountCircleIcon /></Avatar> */}
                    <h1>Create Account</h1>
                    </Grid>

                    <Grid align="center" item xs={12} sm={6} sx={{ mt: 2 }}>
                    <TextField  required
                        id="email"
                        name="email"
                        label="Enter Email"
                        autoComplete="email"
                        value={Data.email}
                        onChange={handleSignUp}
                        sx={{width: 400, height: 56}}
                        />
                    </Grid>

                    <Grid align="center" item xs={12} sm={6}
                    sx={{ mt: 2 }}>
                    <TextField  required
                        id="password"
                        name="password"
                        label="Enter Password"
                        sx={{width: 400, height: 56}}
                        value={Data.password}
                        onChange={handleSignUp}
                        />
                    </Grid>

                    <Grid align="center" item xs={12} sm={6}
                    sx={{ mt: 2 }}>
                    <TextField  required
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        sx={{width: 400, height: 56}}
                        value={Data.confirmPassword}
                        onChange={handleSignUp}
                        />
                    </Grid>


                    <Grid align="center"  item xs={12} sm={6}
                    sx={{ mt: 2 }}>
                        <Button type="submit" color="primary" variant="contained" sx={{width: 400, height: 46,bgcolor:'#ff865b'}} onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </Grid>

                    

                    <Typography variant="h6" color="inherit" align="center" noWrap sx={{mx:{xs: 7, md: 6},mt:2 ,fontSize: 12}} >
                        Already have an account?
                        <Link to="/login" color='secondary'>Click to Sign In</Link>
                    </Typography>
                 
                 </Paper>
            </Container>
        </React.Fragment>
    )
}