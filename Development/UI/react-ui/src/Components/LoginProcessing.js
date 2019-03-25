import React, { Component } from 'react'
import UserStore from "../Store/UserStore";
import {NavLink, Link} from 'react-router-dom';
import {css} from 'emotion';
import UserActions from "../Actions/UserActions";


class LoginProcessing extends Component {
    constructor() {
        super();
        this.state = {
            status: 'pending',
            interval: 0,
            user: null,
            loggedIn: false
        }
    }

    componentDidMount() {
        UserStore._clearSignin();
        UserStore._getUser();
        this.interval = setInterval(() => this.update(), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        if(!this.state.loggedIn) {
            this.authenticate()
        } else {
            this.loadProfile()
        }
    }

    authenticate() {
        if(UserStore._getSignIn() === undefined){
            if(this.state.interval < 10) {
                this.setState({
                    interval: this.state.interval + 1
                });
            } else {
                this.setState({
                    status: 'failure'
                });
                clearInterval(this.interval);
            }
        }
        else {
            if (UserStore._getSignIn() === 'Incorrect username/password') {
                this.setState({
                    status: 'failure'
                });
                clearInterval(this.interval);
            } else {
                localStorage.setItem('loggedIn', 'true');
                this.setState({
                    status: 'success'
                });
                this.setState({
                    status: 'pending',
                    loggedIn: true,
                    interval: 0,
                });
                UserStore._clearUser();
                UserActions.getUserByUsername(localStorage.getItem('username'))
            }
        }
    }

    loadProfile() {
        if(UserStore._getUser() === undefined){
            if(this.state.interval < 10) {
                this.setState({
                    interval: this.state.interval + 1
                });
            } else {
                this.setState({
                    status: 'failure'
                });
                clearInterval(this.interval);
            }
        } else {
            console.log(UserStore._getUser());
            this.setState({
                user: UserStore._getUser(),
                status: 'success'
            });
            clearInterval(this.interval);
        }
    }

    render() {
        if(this.state.status == 'pending') {
            if(this.state.loggedIn) {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold'
                        })}>
                            Loading Profile...
                        </h4>
                    </div>
                )
            } else {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold'
                        })}>
                            Authenticating...
                        </h4>
                    </div>
                )
            }
        } else if(this.state.status == 'failure') {
            if(this.state.loggedIn) {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                            paddingBottom: '1em'
                        })}>
                            Could not load profile</h4>
                        <button className="btn btn-outline-primary"
                                onClick={() => window.location = './login'}>
                            Return to Login
                        </button>
                    </div>
                )
            } else {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                            paddingBottom: '1em'
                        })}>
                            Login Unsuccessful</h4>
                        <button className="btn btn-outline-primary"
                                onClick={() => window.location = './login'}>
                            Return to Login
                        </button>
                    </div>
                )
            }
        } else if(this.state.status == 'success') {
            if(!this.state.loggedIn) {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                            paddingBottom: '1em'
                        })}>
                            Login Successful!
                        </h4>
                    </div>
                )
            } else {
                return (
                    <div className={css({
                        textAlign: 'center',
                        paddingTop: '7em'
                    })}>
                        <h4 className={css({
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                            paddingBottom: '1em'
                        })}>
                            Login Successful!</h4>
                        <NavLink to={'./'}>
                            <button className="btn btn-outline-primary">
                                Continue
                            </button>
                        </NavLink>
                    </div>
                )
            }
        } else {
            return (
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em'
                    })}>
                        Login Unsuccessful</h4>
                    <button className="btn btn-outline-primary"
                            onClick={() => window.location = './login'}>
                        Return to Login
                    </button>
                </div>
            )
        }
    }
}

export default LoginProcessing;