import React, { Component } from 'react'
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import UserActions from '../Actions/UserActions';
import {NavLink} from 'react-router-dom';
import {css} from 'emotion';

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
    }

    componentWillMount(){
        UserStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onChange);
    }

    componentDidMount() {
        UserActions.signin('john','123');
    }

    _onChange(){
        // UserActions.getUsers('srsanghavi');
        // setTimeout(function(){}, 3000);
        // UserActions.getUserByUsername('srsanghavi');
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

    handleSubmit() {
        //UserStore._setNewUser(this.state);

        setTimeout(function(){}, 3000);
        UserActions.registerUser('john', "\"" + this.state.username + "\"", "\"" + this.state.password + "\"", "\"" + this.state.firstName + "\"", "\"" + this.state.lastName + "\"",
            "\"" + this.state.email + "\"")
    }


    render() {
        return(
            <div>
                <div className="signin container-fluid">
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
                        {/*<input*/}
                            {/*className="form-control"*/}
                            {/*placeholder="First Name"*/}
                            {/*value={this.state.firstName}*/}
                            {/*onChange={this.onFirstNameChange}*/}
                            {/*required/>*/}
                        {/*<input*/}
                            {/*className="form-control"*/}
                            {/*placeholder="Last Name"*/}
                            {/*value={this.state.lastName}*/}
                            {/*onChange={this.onLastNameChange}*/}
                            {/*required/>*/}
                        {/*<input*/}
                            {/*className="form-control"*/}
                            {/*type="email"*/}
                            {/*placeholder="Email"*/}
                            {/*value={this.state.email}*/}
                            {/*onChange={this.onEmailChange}*/}
                            {/*required/>*/}
                        <button className="btn btn-block btn-outline-primary"
                                onClick={this.handleSubmit}>
                            Register
                        </button>
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
            </div>
        )

    }
}

export default Register;