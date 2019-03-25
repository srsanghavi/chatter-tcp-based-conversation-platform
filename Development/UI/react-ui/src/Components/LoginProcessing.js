import React, { Component } from 'react'
import UserStore from "../Store/UserStore";
import {NavLink} from 'react-router-dom';
import {css} from 'emotion';
import UserActions from "../Actions/UserActions";

class LoginProcessing extends Component {
    constructor() {
        super();
        this.state = {
            status: 'Authenticating...',
            interval: 0
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }


    update() {
        if(UserStore._getUser() === undefined){
            if(this.state.interval < 7) {
                this.state.interval = this.state.interval + 1
            } else {
                this.setState({
                    status: 'Incorrect username/password'
                })
            }
        }
        else {
            if (UserStore._getUser() === 'Incorrect username/password') {
                this.setState({
                    status: UserStore._getUser()
                })
            } else {
                localStorage.setItem('loggedIn', 'true');
                this.setState({
                    status: 'success'
                })
            }
        }
    }


    render() {
        if(this.state.status == 'Authenticating...') {
            return(
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold'
                    })}>
                        {this.state.status}
                    </h4>
                </div>
            )
        } else if(this.state.status == 'Incorrect username/password') {
            return(
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
                    <NavLink to={'/'}>
                        <button className="btn btn-outline-primary">
                            Return to Login
                        </button>
                    </NavLink>
                </div>
            )
        } else {
            return(
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
                    <NavLink to={'/'}>
                        <button className="btn btn-outline-primary">
                            Continue
                        </button>
                    </NavLink>
                </div>
            )
        }
    }
};

export default LoginProcessing;