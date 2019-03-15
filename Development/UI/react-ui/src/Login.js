import React, { Component } from 'react'
import DataService from './Data'

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

    handleSubmit() {
        DataService.getUserByUsernameAndPassword(this.state.username, this.state.password)
            .then(user => {
                if (user === undefined) {
                    alert('The credentials you entered were incorrect');
                    this.setState({
                        email: '',
                        password: ''
                    })
                } else {
                    localStorage.setItem('id', user.id);
                    localStorage.setItem('username', user.username);
                    window.location = "/"
                }
            }
        )
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
                        <button className="btn btn-block btn-outline-primary"
                                onClick={this.handleSubmit}
                        >
                            Log In
                        </button>
                    </div>
                </div>
                <h3 className="signin-text">Don't have an account?
                    <a style={{color: '#6F4F67'}}
                       href="/register"> Register here</a></h3>
            </div>
        )

    }
}

export default Login