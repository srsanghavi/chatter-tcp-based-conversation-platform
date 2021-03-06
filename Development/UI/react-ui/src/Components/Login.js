import React, { Component } from 'react'
import Api from '../Services/Api';
import UserActions from '../Actions/UserActions';
import {NavLink} from 'react-router-dom';
import {css} from 'emotion';
import AuthStore from '../Store/AuthStore';
import {withRouter} from "react-router-dom";
import Mediauploader from './Mediauploader';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount(){
        AuthStore.addChangeListener(this._onChange);
    }

    componentWillUnmount(){
        AuthStore.removeChangeListener(this._onChange);
    }



    _onChange(){
        const user = AuthStore._getAuthUser();
        if(user===null){
            alert("Could not sign in");
        }else{
            this.props.history.replace("./conversations");            
        }
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


    handleSubmit(){
        localStorage.setItem('username', this.state.username);
        UserActions.signin(this.state.username,this.state.password);
    }


    render() {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
            })}>
                <div className={css({
                    backgroundColor: '#342E37',
                    boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
                    textAlign: 'center',
                })}>
                <h1 id="logo" className={css({
                    color: 'white',
                    fontSize: '3em',
                    fontFamily: 'Pacifico',
                    paddingTop: '0.5em',
                    transform: 'rotate(-5deg)'
                })}>Chatter</h1>
                </div>
                <div className={css({
                    backgroundColor: '#342E37',
                    padding: '1em 1em 2em 1em'
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
                            <button className="btn btn-block btn-outline-primary"
                                    onClick={this.handleSubmit}>
                                Log In
                            </button>
                    </div>
                </div>
                <h3 className="signin-text">Don't have an account?
                    <NavLink to={'./register'}
                             className={css({
                                 "&:hover": {
                                     textDecoration: 'underline #6F4F67 !important'
                                 }
                             })}>
                        <p style={{color: '#6F4F67'}}> Register here</p>
                    </NavLink>
                </h3>
                <Mediauploader/>
            </div>
        )
    }
}

export default withRouter(Login);