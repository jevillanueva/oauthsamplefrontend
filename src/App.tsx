import React, { useState } from 'react';
import logo from './assets/img/logo.svg';
import './App.css';
import { AppBar,  CssBaseline,  Hidden, makeStyles, Toolbar, Typography, useScrollTrigger } from '@material-ui/core';
import NetworkDetector from './NetworkDetector';
import PropTypes from 'prop-types';
import Profile from './profile/Profile';
import Main from './views/Main';
import { BrowserRouter } from 'react-router-dom';
import User from "./services/user.service";
import Control from './profile/Control';
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(0),
  },
  title: {
    flexGrow: 1,
    textAlign: "center"
  },
  logo: {
    width: "42px"
  },
  appbar: {
    [theme.breakpoints.down('sm')]: {
      alignItems: 'center',
    }
  }
}));

function ElevationScroll(props: any) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func,
};

function ButtonAppBar(props: any) {
  const classes = useStyles();
  return (
    <React.Fragment>
      <CssBaseline />
      <ElevationScroll {...props}>
        <AppBar>
          <Toolbar >
              <Hidden smDown>
              <img src={logo} className={classes.logo} alt="logo" />
              </Hidden>
              <Typography variant="h6" className={classes.title} >{"App "}
                <Typography variant="overline" >{process.env.REACT_APP_VERSION}</Typography>
              </Typography>
            {props.logged? <Profile logout={props.logout}/> : null }
            <Control />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
}


function App() {
  const [logged,setLogged] = useState(User.loggedIn())
  const loadProfile = () => {
    setLogged(true);
  }
  const logout = () => {
    setLogged(false);
  }
  return (
    <div className="App">
      <BrowserRouter>
        <ButtonAppBar logged={logged} logout={logout} />
        <Toolbar />
        <Main reloadProfile={loadProfile}/>
      </BrowserRouter>
    </div >
  );
}


export default NetworkDetector(App);
