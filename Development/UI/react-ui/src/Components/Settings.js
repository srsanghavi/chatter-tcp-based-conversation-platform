import React, { Component } from 'react'
import {css} from 'emotion';
import UserActions from "../Actions/UserActions";
import ConversationActions from "../Actions/ConversationActions";
import GroupActions from "../Actions/GroupActions";

class Settings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            newConvUserId: '',
            addUserToGroupUserId: '',
            addUserToGroupGroupId: '',
        }

        this.addUserToGroupSubmit = this.addUserToGroupSubmit.bind(this);
        this.onNewConvUserIdChange = this.onNewConvUserIdChange.bind(this)

        this.newConvSubmit = this.newConvSubmit.bind(this);
        this.onAddUserToGroupUserIdChange = this.onAddUserToGroupUserIdChange.bind(this)
        this.onAddUserToGroupGroupIdChange = this.onAddUserToGroupGroupIdChange.bind(this)
    }

    onNewConvUserIdChange(event) {
        this.setState({newConvUserId: event.target.value});
    }

    onAddUserToGroupUserIdChange(event) {
        this.setState({addUserToGroupUserId: event.target.value});
    }

    onAddUserToGroupGroupIdChange(event) {
        this.setState({addUserToGroupGroupId: event.target.value});
    }

    newConvSubmit() {
        ConversationActions.createUserUserConversation(localStorage.getItem('username'), localStorage.getItem('id'),
            this.state.newConvUserId)
    }

    addUserToGroupSubmit() {
        GroupActions.addUserToGroup(localStorage.getItem('username'), this.state.addUserToGroupUserId,
            this.state.addUserToGroupGroupId)
    }

    render() {
        return (
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                padding: '1em'
            })}>
                {/*<button className="btn-outline-primary"*/}
                {/*onClick={() => {*/}
                {/*localStorage.clear();*/}
                {/*window.location.reload();*/}
                {/*}}>Log Out</button>*/}
                {/*<button className="btn-outline-danger"*/}
                {/*onClick={() => {*/}
                {/*UserActions.deleteUser(localStorage.getItem('username'), localStorage.getItem('id'));*/}
                {/*// localStorage.clear();*/}
                {/*// window.location.reload();*/}
                {/*}}>Delete Account</button>*/}
                <div className="card form-signin form-group">
                    <p>Log Out</p>
                    <button className="btn-outline-primary"
                            onClick={() => {
                                localStorage.clear();
                                window.location.reload();
                            }}>Log Out
                    </button>
                </div>
                <div className="card form-signin form-group">
                    <p>Delete User</p>
                    <button className="btn-outline-danger"
                            onClick={() => {
                                UserActions.deleteUser(localStorage.getItem('username'), localStorage.getItem('id'));
                                // localStorage.clear();
                                // window.location.reload();
                            }}>Delete Account
                    </button>
                </div>
                <div className="card form-signin form-group">
                    <p>Create Conversation with User</p>
                    <input
                        className="form-control"
                        placeholder="UserID"
                        value={this.state.newConvUserId}
                        onChange={this.onNewConvUserIdChange}
                        required/>
                    <button className="btn btn-outline-success"
                            onClick={this.newConvSubmit}>
                        Submit
                    </button>
                </div>
                <div className="card form-signin form-group">
                    <p>Add User to Group</p>
                    <input
                        className="form-control"
                        placeholder="UserID"
                        value={this.state.addUserToGroupUserId}
                        onChange={this.onAddUserToGroupUserIdChange}
                        required/>
                    <input
                        className="form-control"
                        placeholder="GroupID"
                        value={this.state.addUserToGroupGroupId}
                        onChange={this.onAddUserToGroupGroupIdChange}
                        required/>
                    <button className="btn btn-outline-success"
                            onClick={this.addUserToGroupSubmit}>
                        Submit
                    </button>
                </div>
            </div>
        )
    }
};

export default Settings;