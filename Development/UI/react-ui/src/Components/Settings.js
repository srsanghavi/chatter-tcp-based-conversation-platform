import React, { Component } from 'react'
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import UserActions from "../Actions/UserActions";

import AuthStore from '../Store/AuthStore';



class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            creatingGroup: false,
            groupName: ''
        };

        this.createGroupOnClick = this.createGroupOnClick.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);
        this.logOut = this.logOut.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    createGroupOnClick() {
        this.setState({
            creatingGroup: !this.state.creatingGroup,
            groupName: ''
        })
    }

    onGroupNameChange(event) {
        this.setState({
            groupName: event.target.value
        })
    }

    logOut() {
        if(window.confirm("Are you sure you want to log out?")) {
            window.location.reload();
        }
    }

    deleteUser() {
        if(window.confirm("Are you sure you want to delete your account? This action cannot be undone")) {
            UserActions.deleteUser(AuthStore._getAuthUser().username, AuthStore._getAuthUser().id);
            window.location.reload();
        }
    }


    renderGroupForm() {
        return(
            this.state.creatingGroup ?
            <div className={css({
                borderBottom: '1px solid gray',
                padding: '1em',
                fontFamily: 'Titillium Web',
                fontWeight: 'bold',
                textAlign: 'left'
            })}>
                <p>Group Name:</p>
                <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',

                })}>
                    <input type="text"
                               className="input-group-text"
                               value={this.state.groupName}
                               onChange={this.onGroupNameChange}
                               style={{
                                   width: '100%',
                                   fontFamily: 'Titillium Web',
                                   fontWeight: 'bold',
                                   textAlign: 'left'
                               }}/>
                    <button className="btn btn-outline-primary">Submit</button>
                </div>
            </div>
                : null
        )
    }

    render() {

        return(
            <div>
                <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <p>Create New Group</p>
                    <NavLink to={'/settings'}
                    className={css({
                        color: 'black',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#45AAEB'
                        }
                    })}>
                        <i className="fa fa-angle-down fa-2x"
                           onClick={this.createGroupOnClick}></i>
                    </NavLink>
                </div>
                {this.renderGroupForm()}
                <div className={css({
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <NavLink to={'/settings'}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <p onClick={this.logOut}>Log Out</p>
                    </NavLink>
                </div>
                <div className={css({
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <NavLink to={'/settings'}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <p onClick={this.deleteUser}>Delete Account</p>
                    </NavLink>
                </div>
            </div>
        )
    }
};

export default Settings;