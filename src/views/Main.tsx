import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import Login from './Login/Login';
class Main extends React.Component<any,any> {
  render() {
    return (
      
        <Switch>
          <Route exact path='/' render={(props)=> (
              <Login reloadProfile={this.props.reloadProfile} />
          )
          }></Route>
          <Route exact path='/dashboard' component={Dashboard} ></Route>
        </Switch>
    );
  }
}
export default Main;