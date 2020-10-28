import React from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleLogin from 'react-google-login';
import User from "./services/user.service";

function App() {
  const responseGoogle =  (response: any) => {
    console.log(response);
    User.googleLogin(response.tokenId).then(res => {
      console.log(res.data.access_token);
    }).catch( e => {
      User.catchErrors(e);
    })
  }
  const responseGoogleFail =  (response: any) => {
    console.log(response)
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.s
        </p>
        <p>
          {process.env.REACT_APP_VERSION}
        </p>
        <p>
        {process.env.REACT_APP_GOOGLE_CLIENT_ID}
        </p>
        <GoogleLogin
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""} //id gotten from Google
                  buttonText="Log in with Google"
                  onSuccess={responseGoogle}
                  onFailure={responseGoogleFail}
                />
      </header>
    </div>
  );
}

export default App;
