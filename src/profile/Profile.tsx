import { Avatar, Divider, IconButton, List, ListItem, ListItemAvatar, ListItemText, Menu, MenuItem, Typography } from '@material-ui/core';
import React from 'react';
import User from "./../services/user.service";
import { withSnackbar } from 'notistack';
import { Redirect } from 'react-router-dom';

type MyUser = {
  user: any,
  anchorEl?: any
  redirect: boolean,
  next: string
}

class Profile extends React.Component<any, MyUser> {
  constructor(props: any) {
    super(props)
    this.state = {
      user: User.defaultUser(),
      redirect: false,
      next: "/"
    };

  }
  componentDidMount() {
    this.handleReloadProfile();
  }
  handleReloadProfile = () => {
    User.usersMe().then(res => {
      this.setState({ user: res.data })
    }).catch(e => {
      User.catchErrors(e);
    })
  }
  handleLogout = () => {
    this.closeProfile();
    User.logout().then(res => {
      this.setState({ user: User.defaultUser() })
      User.clearSession();
      this.props.enqueueSnackbar(res.data.message, {
        variant: res.data.code === 1 ? 'success' : 'error',
      });
      this.setState({ redirect: true });
      this.props.logout();
    }).catch(e => {
      User.catchErrors(e);
    })
  }
  openProfile = (event: any) => {
    this.setState({ anchorEl: event.currentTarget })
  }
  closeProfile = () => {
    this.setState({ anchorEl: null })
  }
  render() {
    if (!User.loggedIn()){
      return (
        <Redirect push to={this.state.next} />
      )
    }
    return (
      <React.Fragment>
        <IconButton aria-controls="simple-menu" aria-haspopup="true" disabled={this.state.user.email === ""} onClick={this.openProfile}>
          <Avatar alt={this.state.user.given_name} src={this.state.user.picture} />
        </IconButton>
        <Menu
          id="simple-menu"
          anchorEl={this.state.anchorEl}
          keepMounted
          open={Boolean(this.state.anchorEl)}
          onClose={this.closeProfile}
        >
          <MenuItem>
            <ListItemAvatar>
              <Avatar alt={this.state.user.given_name} src={this.state.user.picture} />
            </ListItemAvatar>
            <ListItemText
              primary={this.state.user.email}
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    variant="body2"
                    color="textPrimary"
                  >
                    {`${this.state.user.given_name} ${this.state.user.family_name}`}
                  </Typography>
                </React.Fragment>
              }
            />
          </MenuItem>
          <Divider variant="middle" component="li" />
          <MenuItem onClick={this.handleLogout}>Salir</MenuItem>
        </Menu>
        {this.state.redirect ? <Redirect push to={this.state.next} /> : null}
      </React.Fragment>
    )
  }
}
export default withSnackbar(Profile);