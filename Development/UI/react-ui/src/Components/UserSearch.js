import React, {Component} from 'react'
import {css} from 'emotion';
import UserPreviews from './UserPreviews'
import GroupPreviews from "./GroupPreviews";
import UserActions from '../Actions/UserActions';
import GroupActions from '../Actions/GroupActions';
import AuthStore from '../Store/AuthStore';
import UserStore from '../Store/UserStore';
import GroupStore from '../Store/GroupStore';

class UserSearch extends Component{
    constructor(props){
        super(props);
        this.state = {
            users: [],
            groups: [],
        }
        this._onUsersChanged = this._onUsersChanged.bind(this);
        this._onGroupsChanged = this._onGroupsChanged.bind(this);
    }

    componentWillMount(){
        UserStore.addUserListChangeListener(this._onUsersChanged);
        GroupStore.addGroupsChageListner(this._onGroupsChanged);
        if(this.props.userButtonSelected==true){
            UserActions.getUsers(AuthStore._getAuthUser().username);
        }else{
            GroupActions.getAllGroups(AuthStore._getAuthUser().username);
        }
    }

    componentWillUpdate(){
        
    }

    componentDidMount(){
        this.setState({
            users: UserStore._getUsers(),
            groups: GroupStore._getAllGroups(),
        })
    }

    componentWillUnmount(){
        UserStore.removeUserListChangeListener(this._onUsersChanged);
        GroupStore.removeGroupsListener(this._onGroupsChanged);
    }

    _onUsersChanged(){
        const users = UserStore._getUsers();

        console.log(users);
        this.setState({
            users: UserStore._getUsers(),
        })
    }

    _onGroupsChanged(){
        const groups = GroupStore._getAllGroups();
        console.log(groups);
        this.setState({
            groups: groups,
        })
    }
    render(){
        const props = this.props;
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
            })}>
                {props.userButtonSelected ?
                    this.state.users.map(user => {
                        return( <UserPreviews user={user}
                                              profileOnClick={props.profileOnClick}/>)
                    }) :
                    this.state.groups.map(group => {
                        return( <GroupPreviews group={group}/>)
                    })
                }
            </div>
        )
    }
}

export default UserSearch;