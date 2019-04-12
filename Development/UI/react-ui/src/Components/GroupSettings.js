import React, { Component } from 'react'
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import GroupHeader from "./GroupHeader";
import GroupActions from "../Actions/GroupActions";
import AuthStore from "../Store/AuthStore";
import UserActions from "../Actions/UserActions";
import UserStore from "../Store/UserStore";
import GroupStore from "../Store/GroupStore";
import SearchBar from "./SearchBar"



class GroupSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groupId: this.props.match.params.gid,
            conversationId: this.props.match.params.cid,
            groupName: '',
            users: [],
            groups: [],
            showGroupForm: false,
            showUsers: false,
            showGroups: false,
            search: ''
        };

        this.changeGroupName = this.changeGroupName.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);
        this.onGroupNameSubmit = this.onGroupNameSubmit.bind(this);
        this.getGroupsOnClick = this.getGroupsOnClick.bind(this);
        this.getUsersOnClick = this.getUsersOnClick.bind(this);
        this._onGroupsChanged = this._onGroupsChanged.bind(this);
        this._onUsersChanged = this._onUsersChanged.bind(this);
        this.addUserToGroup = this.addUserToGroup.bind(this);
        this.addGroupToGroup = this.addGroupToGroup.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

    }

    componentWillMount() {
        UserStore.addUserListChangeListener(this._onUsersChanged);
        GroupStore.addGroupsChangeListener(this._onGroupsChanged);
    }

    componentWillUnmount(){
        UserStore.removeUserListChangeListener(this._onUsersChanged);
        GroupStore.removeGroupsListener(this._onGroupsChanged);
    }

    _onUsersChanged(){
        this.setState({
            users: UserStore._getUsers(),
        })
    }

    _onGroupsChanged(){
        this.setState({
            groups: GroupStore._getAllGroups()
        })
    }


    getUsersOnClick() {
        if(!this.state.showUsers) {
            UserActions.getUsers(AuthStore._getAuthUser().username);
        }
        this.setState({
            showUsers: !this.state.showUsers,
        })
    }

    getGroupsOnClick() {
        if(!this.state.showGroups) {
            GroupActions.getAllGroups(AuthStore._getAuthUser().username);
        }
        this.setState({
            showGroups: !this.state.showGroups,
        })

    }

    changeGroupName() {
        this.setState({
            showGroupForm: !this.state.showGroupForm,
            groupName: ''
        })
    }

    onGroupNameChange(event) {
        this.setState({
            groupName: event.target.value
        })
    }

    onGroupNameSubmit() {
        if(this.state.groupName === '') {
            alert('Please enter a group name')
        } else {
            GroupActions.updateGroupName(AuthStore._getAuthUser().username, this.state.groupName, this.state.groupId)
            this.setState({
                groupName: ''
            })
        }
    }

    addUserToGroup(id, username) {
        if(window.confirm("Add " + username + "to group?")) {
            GroupActions.addUserToGroup(AuthStore._getAuthUser().username, id, this.state.groupId, username)
        }
    }

    addGroupToGroup(id, name) {
        if(window.confirm("Add " + name + "to group?")) {
            GroupActions.addGroupToGroup(AuthStore._getAuthUser().username, this.state.groupId, id, name)
        }
    }

    toggleSearch() {
        this.setState({
            broadcastBar: this.state.searchBar ? this.state.broadcastBar : false,
            searchBar: !this.state.searchBar,
            search: ''
        })
    }

    onSearchChange(event) {
        this.setState({search: event.target.value});
    }

    renderSearchBar() {
        if(this.state.searchBar) {
            return(
                <div className={css({paddingBottom: '3em'})}>
                    <SearchBar search={this.state.search}
                               onChange={this.onSearchChange}/>
                </div>
            )
        }
    }

    renderUsers() {

        const filteredUsers = this.state.users.filter(user => {
            return (
                user.id !== AuthStore._getAuthUser().id &&
                user.isSearchable &&
                !user.deleted &&
                (user.first_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                    user.last_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                    user.username.toUpperCase().includes(this.state.search.toUpperCase()))
            )
        });



        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                overflowY: 'scroll',
                borderBottom: '1px solid gray',
            })}>
                {filteredUsers.map(user => {
                    return(
                            <div onClick={() => {this.addUserToGroup(user.id, user.username)}}
                                className={css({
                                    display: 'flex',
                                    flexDirection: 'column',
                                    textAlign: 'center',
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                                    padding: '1em',
                                    margin: '1em',
                                    width: '250px',
                                    minHeight: '300px'
                                })}>
                                <div className={css({
                                    border: '1px solid black',
                                    borderRadius: '5px',
                                    height: '200px',
                                    width: '200px',
                                    backgroundColor: '#FCF7FC',
                                    marginBottom: '0.5em'
                                })}>
                                <img src={user.profilePicture}
                                     width='100%' height='100%'
                                     className={css({
                                        border: '1px solid gray',
                                        borderRadius: '5px',
                                    })}/>
                                </div>
                                <h4 style={{fontFamily:"Titillium Web", fontWeight:'bold'}}>
                                    {user.first_name} {user.last_name}</h4>
                                <h6 style={{fontFamily:"Titillium Web", fontWeight:'bold'}}>
                                    {user.username}</h6>
                                <h6 style={{fontFamily:"Titillium Web", fontWeight:'bold'}}>
                                    {user.preferredLanguage}</h6>
                            </div>
                    )
                })}
            </div>
        )
    }


    renderGroups() {

        const filteredGroups = this.state.groups.filter(group => {
            return (
                group.isSearchable &&
                group.id != this.state.groupId &&
                group.name.toUpperCase().includes(this.state.search.toUpperCase())
            )
        });

        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                overflowY: 'scroll',
                borderBottom: '1px solid gray',
            })}>
                {filteredGroups.map(group => {
                    return(
                        <div onClick={() => {this.addGroupToGroup(group.id, group.name)}}
                             className={css({
                                 display: 'flex',
                                 flexDirection: 'column',
                                 textAlign: 'center',
                                 border: '1px solid black',
                                 borderRadius: '5px',
                                 boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)',
                                 padding: '1em',
                                 margin: '1em',
                                 width: '250px',
                                 minHeight: '250px'
                             })}>
                            <div className={css({
                                border: '1px solid black',
                                borderRadius: '5px',
                                height: '200px',
                                width: '200px',
                                backgroundColor: '#FCF7FC',
                                marginBottom: '0.5em'
                            })}>
                                <img src={"../../images/group.png"}
                                     width='100%' height='100%' alt=""
                                     className={css({
                                         border: '1px solid gray',
                                         borderRadius: '5px',
                                     })}/>
                            </div>
                            <h4 style={{fontFamily:"Titillium Web", fontWeight:'bold'}}>
                                {group.name}</h4>
                        </div>
                    )
                })}
            </div>
        )
    }

    renderGroupForm() {
        return(
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
                    <button className="btn btn-outline-primary"
                        onClick={this.onGroupNameSubmit}>Submit</button>
                </div>
            </div>
        )
    }


    render() {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
            })}>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <GroupHeader fromConversation={true}
                                 groupId={this.state.groupId}
                                 conversationId={this.state.conversationId}
                                 searchClick={this.toggleSearch}/>
                </div>
                {this.renderSearchBar()}
                <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <p>Change Group Name</p>
                    <NavLink to={window.location}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        {this.state.showGroupForm ?
                            <i className="fa fa-angle-up fa-2x"
                               onClick={this.changeGroupName}></i> :
                            <i className="fa fa-angle-down fa-2x"
                               onClick={this.changeGroupName}></i>}
                    </NavLink>
                </div>
                {this.state.showGroupForm ? this.renderGroupForm() : null}
                <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <p>Add Users</p>
                    <NavLink to={window.location}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        {this.state.showUsers ?
                            <i className="fa fa-angle-up fa-2x"
                               onClick={this.getUsersOnClick}></i> :
                            <i className="fa fa-angle-down fa-2x"
                               onClick={this.getUsersOnClick}></i>}
                    </NavLink>
                </div>
                {this.state.showUsers ? this.renderUsers() : null}
                <div className={css({
                    display: 'flex',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <p>Add Groups</p>
                    <NavLink to={window.location}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        {this.state.showGroups ?
                            <i className="fa fa-angle-up fa-2x"
                               onClick={this.getGroupsOnClick}></i> :
                            <i className="fa fa-angle-down fa-2x"
                               onClick={this.getGroupsOnClick}></i>}
                    </NavLink>
                </div>
                {this.state.showGroups ? this.renderGroups() : null}
            </div>
        )
    }
};

export default GroupSettings;