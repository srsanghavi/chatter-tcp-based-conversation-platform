import React, { Component } from 'react'
import DataService from './Data'
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import UserActions from '../Actions/UserActions';
import ConversationStore from '../Store/ConversationStore';
import ConversationActions from '../Actions/ConversationActions';
import {NavLink} from 'react-router-dom';

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
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
    }

    componentWillMount(){
        UserStore.addChangeListener(this._onChange);
        ConversationStore.addChangeListener(this._onConversationsChanged);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onChange);
        ConversationStore.removeChangeListener(this._onConversationsChanged);
    }

    componentDidMount() {
        console.log(window.socket)
    }

    _onConversationsChanged(){
        var conv = ConversationStore.getConversations();

    }

    _onChange(){
        console.log("logged In");
        // UserActions.getUsers('srsanghavi');
        // setTimeout(function(){}, 3000);
        // UserActions.getUserByUsername('srsanghavi');
        // ConversationActions.getConversations('srsanghavi','1');
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


    // handleSubmit() {
    //     DataService.getUserByUsernameAndPassword(this.state.username, this.state.password)
    //         .then(user => {
    //             if (user === undefined) {
    //                 alert('The credentials you entered were incorrect');
    //                 this.setState({
    //                     email: '',
    //                     password: ''
    //                 })
    //             } else {
    //                 localStorage.setItem('id', user.id);
    //                 localStorage.setItem('username', user.username);
    //                 window.location = "/"
    //             }
    //         }
    //     )
    // }

    handleSubmit(){
        UserActions.signin(this.state.username,this.state.password);
        if(window.socket !== undefined) {
            if(!window.socket.closed) {
                localStorage.setItem('loggedIn', 'true')
            }
        }
        console.log(localStorage.getItem('loggedIn'))
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
                        <NavLink to={'./'}>
                            <button className="btn btn-block btn-outline-primary"
                                    onClick={this.handleSubmit}>
                                Log In
                            </button>
                        </NavLink>
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