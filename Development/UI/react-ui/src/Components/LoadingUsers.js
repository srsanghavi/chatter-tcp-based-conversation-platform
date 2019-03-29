import React, { Component } from 'react'
import UserStore from "../Store/UserStore";
import { NavLink } from 'react-router-dom';
import { css } from 'emotion';
import UserActions from "../Actions/UserActions";
import ConversationStore from "../Store/ConversationStore";
import ConversationActions from "../Actions/ConversationActions";

// component updates every interval (in ms)
const INTERVAL = 500;

// count of intervals after which log in will fail. interval count is reset at each step
const TIMEOUT = 15;

class LoadingUsers extends Component {

}

export default LoadingUsers