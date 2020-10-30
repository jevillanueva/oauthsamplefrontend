import { Box, Container, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './Login/Login';
import NotFound from './../assets/img/404.svg';
class Main extends React.Component<any, any> {
  render() {
    return (

      <Switch>
        <Route exact path='/' render={(props) => (
          <Login reloadProfile={this.props.reloadProfile} />
        )
        }></Route>
        <Route exact path='/dashboard' component={Dashboard} ></Route>
        <Route component={FourOhFour} />
      </Switch>
    );
  }
}
export default Main;

const useStyles = makeStyles({
  error: {
    width: "50%"
  }
});
const FourOhFour = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Container maxWidth="md">
        <Box my={3}>
          {/* https://stories.freepik.com/illustration/404-error-with-a-cute-animal/rafiki/animate?share=7428 */}
          <Typography variant="h2" gutterBottom>Lo sentimos!</Typography>
          <Typography variant="h5" gutterBottom>Página no encontrada</Typography>
          <img src={NotFound} alt="success" className={classes.error} />
        </Box>
      </Container>
    </React.Fragment>
  )
};