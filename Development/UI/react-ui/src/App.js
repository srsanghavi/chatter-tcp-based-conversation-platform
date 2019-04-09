import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Conversation from './Components/Conversation';
import Login from "./Components/Login";
import HomePage from "./Components/HomePage";
import Authentication from './Components/Authentication'
import LoginProcessing from "./Components/LoginProcessing";
import RegisterProcessing from "./Components/RegisterProcessing";
import Register from "./Components/Register";
import Thread from './Components/Thread';
import GroupMembers from "./Components/GroupMembers";
import Profile from "./Components/Profile";

class App extends Component {


  render() {
      return (
          <div>
                  <Switch>
                      <Route path="/authentication">
                          {() => <LoginProcessing/>}
                      </Route>
                      <Route path="/login">
                          {() => <Login/>}
                      </Route>
                      <Route path="/register">
                          {() => <Register/>}
                      </Route>
                      <Route path="/processing">
                          {() => <RegisterProcessing/>}
                      </Route>
                      <Route exact path="/conversations/:id"
                             component={Conversation}>
                      </Route>
                      <Route exact path="/conversations/:id/thread/:threadId"
                             component={Thread}>
                      </Route>
                      <Route path="/group/:id"
                             component={GroupMembers}>
                      </Route>
                      <Route path="/profile/:username"
                             component={Profile}>
                      </Route>
                      <Route path="/">
                          <Authentication page={<HomePage/>}/>
                      </Route>
                  </Switch>
          </div>
    );
  }
}

export default App;
