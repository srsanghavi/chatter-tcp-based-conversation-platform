import React, { Component } from 'react'
import UserStore from "../Store/UserStore";
import { css } from 'emotion';
import UserActions from "../Actions/UserActions";

const status = {
    PENDING: 'pending',
    FAILURE: 'failure',
    SUCCESS: 'success'
};

// component updates every interval (in ms)
const INTERVAL = 100;

// count of intervals after which log in will fail. interval count is reset at each step
const TIMEOUT = 100;

class RegisterProcessing extends Component {
    constructor() {
        super();
        this.state = {
            interval: 0,
            status: status.PENDING,
            loggedIn: false,
            registered: false,
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), INTERVAL);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        if (!(this.state.loggedIn && this.state.registered)) {
            this.authenticate()
        } else {
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
            this.setState({
                status: status.PENDING,
                interval: 0,
                loggedIn: true
            });
            UserStore._clearUser();
            this.registerUser();
        }
    }

    registerUser() {
        console.log(UserStore._getNewUser());
        let username = UserStore._getNewUser().username;
        let password = UserStore._getNewUser().password;
        let firstName = UserStore._getNewUser().firstName;
        let lastName = UserStore._getNewUser().lastName;
        let email = UserStore._getNewUser().email;
        UserActions.registerUser('john', "\"" + username + "\"", "\"" + password + "\"", "\"" + firstName + "\"", "\""
            + lastName + "\"", "\"" + email + "\"");
        setTimeout(function(){}, 1500);
        this.setState({
            registered: true
        })
    }


    render() {
        if(this.state.loggedIn && this.state.registered) {
            UserStore._clearAll();
            return (
                <div className={css({
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translateY(-50%) translateX(-50%)',
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Registration Successful!</h4>
                    <button className="btn btn-outline-primary"
                            onClick={() => window.location = './login'}>
                        Back to Login
                    </button>
                </div>
            )
        } else if(this.state.status === status.FAILURE) {
            return (
                <div className={css({
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translateY(-50%) translateX(-50%)',
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Registration unsuccessful
                    </h4>
                    <button className="btn btn-outline-primary"
                            onClick={() => window.location = './register'}>
                        Return
                    </button>
                </div>
            )
        } else if(!(this.state.loggedIn && this.state.registered)) {
            return (
                <div className={css({
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '40%',
                    transform: 'translateY(-50%) translateX(-50%)',
                })}>
                    <h4 className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Registering ...
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

export default RegisterProcessing;