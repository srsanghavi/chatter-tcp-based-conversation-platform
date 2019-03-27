import React, { Component } from 'react'
import UserStore from "../Store/UserStore";
import { NavLink, Redirect } from 'react-router-dom';
import { css } from 'emotion';
import UserActions from "../Actions/UserActions";
import ConversationStore from "../Store/ConversationStore";
import ConversationActions from "../Actions/ConversationActions";


const status = {
    PENDING: 'pending',
    FAILURE: 'failure',
    SUCCESS: 'success'
};

// component updates every interval (in ms)
const INTERVAL = 500;

// count of intervals after which log in will fail. interval count is reset at each step
const TIMEOUT = 15;

class LoginProcessing extends Component {
    constructor() {
        super();
        this.state = {
            interval: 0,
            status: status.PENDING,
            loggedIn: false,
            userLoaded: false,
            usersLoaded: false,
            conversationsLoaded: false,
            finishedLoading: false,
        }
    }

    componentDidMount() {
        UserStore._clearAll();
        this.interval = setInterval(() => this.update(), INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        console.log(this.state);
        console.log(ConversationStore._getConversations());
        if(!this.state.finishedLoading) {
            if (!this.state.loggedIn) {
                this.authenticate()
            } else if (!this.state.userLoaded) {
                this.loadUser()
            } else if (!this.state.usersLoaded) {
                this.loadUsers()
            } else if (!this.state.conversationsLoaded) {
                this.loadConversations()
            }
        } else {
            this.setState({
                status: status.SUCCESS
            })
            clearInterval(this.interval);
        }
    }

    authenticate() {
        if(UserStore._getSignIn() === undefined){
            if(this.state.interval < TIMEOUT) {
                this.setState({ interval: this.state.interval + 1});
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else if (UserStore._getSignIn() === 'Incorrect username/password') {
            this.setState({ status: status.FAILURE });
            clearInterval(this.interval);
        } else {
            localStorage.setItem('loggedIn', 'true');
            this.setState({
                status: status.PENDING,
                interval: 0,
                loggedIn: true,
                finishedLoading: this.state.userLoaded &&
                                 this.state.usersLoaded &&
                                 this.state.conversationsLoaded
            });
            UserStore._clearUser();
            UserActions.getUserByUsername(localStorage.getItem('username'))
        }
    }

    loadUser() {
        if(UserStore._getUser() === undefined){
            if(this.state.interval < TIMEOUT) {
                this.setState({ interval: this.state.interval + 1 });
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else {
            this.setState({
                status: status.PENDING,
                interval: 0,
                userLoaded: true,
                finishedLoading: this.state.loggedIn &&
                                 this.state.usersLoaded &&
                                 this.state.conversationsLoaded
            });
            let id = JSON.parse(UserStore._getUser()).result[0].id;
            localStorage.setItem('id', id);
            UserStore._clearUsers();
            UserActions.getUsers(localStorage.getItem('username'))
        }
    }

    loadUsers() {
        if(UserStore._getUsers() === undefined){
            if(this.state.interval < TIMEOUT) {
                this.setState({ interval: this.state.interval + 1 });
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else {
            this.setState({
                status: status.PENDING,
                interval: 0,
                usersLoaded: true,
                finishedLoading: this.state.loggedIn &&
                                 this.state.userLoaded &&
                                 this.state.conversationsLoaded
            });
            ConversationStore._clearConversations();
            ConversationActions.getConversations(localStorage.getItem('username'), localStorage.getItem('id'))
        }
    }

    loadConversations() {
        if(UserStore._getUsers() === undefined){
            if(this.state.interval < 100000) {
                this.setState({ interval: this.state.interval + 1 });
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else {
            this.setState({
                status: status.PENDING,
                interval: 0,
                conversationsLoaded: true,
                finishedLoading: this.state.loggedIn &&
                                 this.state.userLoaded &&
                                 this.state.usersLoaded
            });
        }
    }

    render() {
        if(this.state.finishedLoading) {
            // return(
            //     <Redirect to={'./conversations'}/>
            // )
            return (
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Login Successful!</h4>
                    <NavLink to={'./conversations'}>
                        <button className="btn btn-outline-primary">
                            Continue
                        </button>
                    </NavLink>
                </div>

            )
        } else if(this.state.status === status.FAILURE) {
            return (
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        {this.state.loggedIn ? 'Failed to load data' : 'Login Failed' }
                    </h4>
                    <button className="btn btn-outline-primary"
                            onClick={() => window.location = './login'}>
                        Return to Login
                    </button>
                </div>
            )
        } else if(this.state.status === status.PENDING) {
            return (
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        {this.state.loggedIn ? 'Loading your information...' : 'Authenticating...' }
                    </h4>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        }
    }
}

export default LoginProcessing;