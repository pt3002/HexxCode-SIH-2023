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
import { Avatar,ButtonGroup } from '@mui/material';
import {getUsers} from './signup-user';

// const users=getUsers();
export default function CurriculumDeveloperLogin() {
    const [Data, setData] = React.useState({
        email: '',
        password: ''
    });
    // const [email, setEmail] = React.useState('')
    // const [password, setPassword] = React.useState('')
    console.log(Data);
    const handleLogin = (ev) => {
        console.log("start"+ev);
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
        // console.log(users);
        // if(users.some(user=>(user.email===Data.email && user.password===Data.password)))
        {
        console.log("Logged In Successfully : ",Data);
        }
        // else{
        //     console.log("incorrect credentials")
        // }
      };
    return(
        
        <React.Fragment>
            <CssBaseline />
            {/* <AppBar
                position="absolute"
                color="default"
                elevation={0}
                sx={{
                  position: 'relative',
                  borderBottom: (t) => `1px solid ${t.palette.divider}`,
                }}
            >
            
            </AppBar> */}
            {/* <Container component="main" maxWidth="md" sx={{ mb: 4 }}>

                <Grid align="center" sx={{mt: 5,mb:4}}>
                <img src="./static/images/logo/logo_new.png" alt="aicte" />
                </Grid>
            </Container> */}

            <Container component="main"  sx={{ mb: 4 ,width: 500}}  
            direction="column">

                <Grid align="center" sx={{mt: 5,mb:2}}>
                <Typography component="h1" variant="h2" align="center" sx={{mb:2}}>
            Select User
          </Typography>
                 
                {/* <ButtonGroup variant="contained">
                    <Button><Avatar sx={{width: 56, height: 56}} ><AccountCircleIcon /></Avatar></Button>
                    <Button>Two</Button>
                    <Button>Three</Button>
                </ButtonGroup> */}
                </Grid>
                 <Paper variant="outlined" sx={{my: { xs: 7, md: 6 }, p: { xs: 2, md: 3 }, borderRadius: 2.5}} >

                 <Grid align="center" sx={{mt: 1,mb:4}}>
                <img src="./static/images/logo/logo_new.png" alt="aicte" />
                </Grid>

                    <Grid align="center">
                    {/* <Avatar sx={{width: 56, height: 56}} ><AccountCircleIcon /></Avatar> */}
                    <h1>Sign In</h1>
                    </Grid>

                    <Grid align="center" item xs={12} sm={6} sx={{ mt: 2 }}>
                    <TextField  required
                        id="email"
                        name="email"
                        label="Email"
                        autoComplete="email"
                        value={Data.email}
                        onChange={handleLogin}
                        sx={{width: 400, height: 56}}
                        />
                    </Grid>

                    <Grid align="center" item xs={12} sm={6}
                    sx={{ mt: 2 }}>
                    <TextField  required
                        id="password"
                        name="password"
                        label="Password"
                        sx={{width: 400, height: 56}}
                        value={Data.password}
                        onChange={handleLogin}
                        />
                    </Grid>

                    <Typography variant="h6" color="inherit" align="right" noWrap sx={{mx:{xs: 7, md: 6},mt:1 ,fontSize: 12}} >
                        <Link href="#" color='secondary'>Forgot Password?</Link>
                    </Typography>

                    <Grid align="center"  item xs={12} sm={6}
                    sx={{ mt: 2 }}>
                        <Button type="submit"  variant="contained" sx={{width: 400, height: 46,bgcolor:'#ff865b'}} onClick={handleSubmit}>
                            Sign In
                        </Button>
                    </Grid>

                    

                    <Typography variant="h6" color="inherit" align="center" noWrap sx={{mx:{xs: 7, md: 6},mt:2 ,fontSize: 12}} >
                        Don't have and account?
                        <Link href="/sign-up" color='secondary'>Click to Sign Up</Link>
                    </Typography>
                 
                 </Paper>
            </Container>
        </React.Fragment>
    )
}