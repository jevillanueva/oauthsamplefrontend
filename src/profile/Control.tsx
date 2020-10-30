import React from 'react';
import User from "./../services/user.service";
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';

type redirect = {
  next: string
}

class Control extends React.Component<any, redirect> {
  constructor(props: any) {
    super(props)
    this.state = {
      next: "/"
    };

  }
  render() {
    if (!User.loggedIn()){
      return (
        <Redirect push to={this.state.next} />
      )
    }
    return (
      <React.Fragment></React.Fragment>
    )
  }
}
export default withSnackbar(Control);