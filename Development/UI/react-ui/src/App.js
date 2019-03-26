import React, { Component } from 'react';
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import {css} from 'emotion';
import 'font-awesome/css/font-awesome.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import './App.css';
import Conversation from './Components/Conversation';
import Login from "./Components/Login";
import ConversationPreviewOld from './Components/ConversationPreviewOld';
import HomePage from "./Components/HomePage";
import ThreadContainer from "./Components/ThreadContainer";
import Authentication from './Components/Authentication'
import LoginProcessing from "./Components/LoginProcessing";
import Register from "./Components/Register";

class App extends Component {


  render() {
      return (
          <div>
              <BrowserRouter>
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
                      <Route path="/conversation/:id"
                             component={Conversation}>
                          {/*{() => <Conversation/>}*/}
                      </Route>
                      <Route path="/">
                          <Authentication page={<HomePage/>}/>
                      </Route>
                  </Switch>
              </BrowserRouter>
          </div>
    );
  }
}

export default App;
