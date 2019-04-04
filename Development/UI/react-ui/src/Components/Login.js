import React, { Component } from 'react'
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import UserActions from '../Actions/UserActions';
import {NavLink} from 'react-router-dom';
import {css} from 'emotion';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        };

        this.onUsernameChange = this.onUsernameChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
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
        //console.log(localStorage.getItem('loggedIn'));
    }

    _onChange(){
        console.log("logged In");
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


    handleSubmit(){
        localStorage.setItem('username', this.state.username);
        UserActions.signin(this.state.username,this.state.password);
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
                        <NavLink to={'./authentication'}
                                className={css({
                                    textDecoration: 'none !important'
                                })}>
                            <button className="btn btn-block btn-outline-primary"
                                    onClick={this.handleSubmit}>
                                Log In
                            </button>
                        </NavLink>
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
            </div>
        )
    }
}

export default Login