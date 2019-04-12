import React, { Component } from 'react'
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import UserActions from '../Actions/UserActions';
import {NavLink} from 'react-router-dom';
import {css} from 'emotion';
import AuthStore from "../Store/AuthStore";

const REGISTER_HANDLER_USERNAME = 'registerHandler';
const REGISTER_HANDLER_PASSWORD = 'registerHandler';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: ''
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onFirstNameChange = this.onFirstNameChange.bind(this);
        this.onLastNameChange = this.onLastNameChange.bind(this);
        this.onEmailChange = this.onEmailChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this.missingFieldsCheck = this.missingFieldsCheck.bind(this)
    }

    componentWillMount(){
        AuthStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        AuthStore.removeChangeListener(this._onChange);
    }



    _onChange() {
        const user = AuthStore._getAuthUser();
        if(user===null){
            alert("Error");
        }else{
            UserActions.registerUser(AuthStore._getAuthUser().username, this.state.username, this.state.password,
            this.state.firstName, this.state.lastName, this.state.email);
            AuthStore._clearAuthUser();
        }
        this.setState({
            username: '',
            password: '',
            firstName: '',
            lastName: '',
            email: ''
        })
    }

    onUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    onPasswordChange(event) {
        this.setState({
            password: event.target.value
        })
    }

    onFirstNameChange(event) {
        this.setState({
            firstName: event.target.value
        })
    }

    onLastNameChange(event) {
        this.setState({
            lastName: event.target.value
        })
    }

    onEmailChange(event) {
        this.setState({
            email: event.target.value
        })
    }

    missingFieldsCheck() {
        return this.state.username === '' ||
            this.state.password === '' ||
            this.state.email === '' ||
            this.state.firstName === '' ||
            this.state.lastName === ''
    }

    handleSubmit() {
        if(this.missingFieldsCheck()) {
            alert('All fields are required')
        } else {
            UserActions.signin(REGISTER_HANDLER_USERNAME, REGISTER_HANDLER_PASSWORD);
        }
    }


    render() {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
            })}>
                <div className={css({
                    backgroundColor: '#342E37',
                    padding: '1em'
                })}>
                    <div className="card form-signin form-group">
                        <input
                            className="form-control"
                            placeholder="Username"
                            value={this.state.username}
                            onChange={this.onUsernameChange}
                            required/>
                        <input
                            className="form-control"
                            type="password"
                            placeholder="Password"
                            value={this.state.password}
                            onChange={this.onPasswordChange}
                            required/>
                        <input
                            className="form-control"
                            placeholder="First Name"
                            value={this.state.firstName}
                            onChange={this.onFirstNameChange}
                            required/>
                        <input
                            className="form-control"
                            placeholder="Last Name"
                            value={this.state.lastName}
                            onChange={this.onLastNameChange}
                            required/>
                        <input
                            className="form-control"
                            type="email"
                            placeholder="Email"
                            value={this.state.email}
                            onChange={this.onEmailChange}
                            required/>
                            <NavLink to={window.location}>
                                <button className="btn btn-block btn-outline-primary"
                                        onClick={this.handleSubmit}>
                                    Register
                                </button>
                            </NavLink>
                    </div>
                </div>
                <h3 className="signin-text">Already Registered?
                    <NavLink to={'./login'}
                            className={css({
                                "&:hover": {
                                    textDecoration: 'underline #6F4F67 !important'
                                }
                            })}>
                        <p style={{color: '#6F4F67'}}> Log in here</p>
                    </NavLink>
                </h3>
                <div className={css({
                    textAlign: 'center',
                    padding: '1em 1em 2em 1em',
                })}>
                    <h1 id="logo" className={css({
                        color: '342E37',
                        fontSize: '3em',
                        fontFamily: 'Pacifico',
                        paddingTop: '0.5em',
                        transform: 'rotate(-5deg)'
                    })}>Chatter</h1>
                </div>
            </div>
        )

    }
}

export default Register;