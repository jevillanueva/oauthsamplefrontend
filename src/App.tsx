import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import User from "./services/user.service";
import { AppBar, Container, Grid, Hidden, makeStyles, Toolbar, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 3,
  },
  logo: {
    width: "60px"
  },
  appbar: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    }
  }
}));

function ButtonAppBar() {
  const classes = useStyles();

  return (
    <AppBar position="static" color={"transparent"} className={classes.appbar} >
      <Toolbar >
        <Hidden smDown>
          <Typography variant="h6" className={classes.title}>
            App
          </Typography>
        </Hidden>
        <img src={logo} className={classes.logo} alt="logo" />
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
}


function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const [givenName, setGivenName] = useState("");
  const [familyName, setFamilyName] = useState("");
  const [email, setEmail] = useState("");
  const [picture, setPicture] = useState("");


  const handleLoadUserMe = () => {
    User.usersMe().then(res => {
      setGivenName(res.data.given_name);
      setFamilyName(res.data.family_name);
      setEmail(res.data.email);
      setPicture(res.data.picture);
    }).catch(e => {
      User.catchErrors(e);
    })
  }
  const responseGoogle = (response: any) => {
    console.log(response);
    User.googleLogin(response.tokenId).then(res => {
      User.saveSession(res.data.access_token, res.data.date_expires, res.data.expires)
      enqueueSnackbar("Login App", {
        variant: 'success',
      });
      handleLoadUserMe();
    }).catch(e => {
      User.catchErrors(e);
    })
  }
  const responseGoogleFail = (response: any) => {
    console.log(response)
    enqueueSnackbar(response.error, {
      variant: 'error',
    });

  }
  handleLoadUserMe();
  return (
    <div className="App">
      <ButtonAppBar></ButtonAppBar>
      <br></br>
      <Container fixed >
        <Grid container spacing={0} alignItems="center" justify="center" direction="column" alignContent="center">
          <Grid item>

            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""} //id gotten from Google
              buttonText="Login Google Account"
              onSuccess={responseGoogle}
              onFailure={responseGoogleFail}
            />

          </Grid>
          <Grid item>
            <Typography>{givenName}</Typography>
            <Typography>{familyName}</Typography>
            <Typography>{email}</Typography>
            <img src={picture} />
          </Grid>
          <Grid item>
            <p>
              {process.env.REACT_APP_VERSION}
            </p>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}

export default App;
