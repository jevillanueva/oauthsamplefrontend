import { Container,  Typography } from '@material-ui/core';
import { withSnackbar } from 'notistack';
import React from 'react';
import GoogleLogin from 'react-google-login';
import { Redirect } from 'react-router-dom';
import User from "./../../services/user.service";
import presentation from './../../assets/img/presentation.svg';


class Login extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      redirect: false,
      next: "/dashboard"
    }
  }
  responseGoogle = (response: any) => {
    console.log(response);
    User.googleLogin(response.tokenId).then(res => {
      User.saveSession(res.data.access_token, res.data.date_expires, res.data.expires)
      this.props.enqueueSnackbar("Login Success", {
        variant: 'success',
      });
      this.setState({ redirect: true })
      this.props.reloadProfile();
    }).catch(e => {
      User.catchErrors(e);
    })
  }
  responseGoogleFail = (response: any) => {
    console.log(response)
    this.props.enqueueSnackbar(response.error, {
      variant: 'error',
    });

  }
  render() {
    return (
      <Container fixed >
        <Typography variant="h2">My Application</Typography>
        <img src={presentation} className={"presentation"} alt="My Application" />
        <br></br>
        <GoogleLogin
          clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""} //id gotten from Google
          buttonText="Login Google Account"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogleFail}
        />
        {this.state.redirect ? <Redirect push to={this.state.next} /> : null}
      </Container>
    )
  }
}
export default withSnackbar(Login);