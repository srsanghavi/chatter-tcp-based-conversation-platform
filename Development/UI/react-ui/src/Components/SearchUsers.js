import React, { Component } from 'react'
import {css} from 'emotion';
import UserStore from "../Store/UserStore";
import UserActions from "../Actions/UserActions";
import AuthStore from "../Store/AuthStore";
import UserPreviews from "./UserPreviews";
import { NavLink } from 'react-router-dom';
import SearchBar from "./SearchBar";


class SearchUsers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
        console.log(props);
        this._onUsersChanged = this._onUsersChanged.bind(this);
    }

    componentWillMount() {
        UserStore.addUserListChangeListener(this._onUsersChanged);
        UserActions.getUsers(AuthStore._getAuthUser().username);
    }

    componentDidMount() {
        this.setState({
            users: UserStore._getUsers(),
        })
    }

    componentWillUnmount(){
        UserStore.removeUserListChangeListener(this._onUsersChanged);
    }

    _onUsersChanged(){
        this.setState({
            users: UserStore._getUsers(),
        })
    }

    render() {
        const filteredUsers = this.state.users.filter(user => {
            return (
                user.id !== AuthStore._getAuthUser().id &&
                user.isSearchable &&
                !user.deleted &&
                (user.first_name.toUpperCase().includes(this.props.search.toUpperCase()) ||
                    user.last_name.toUpperCase().includes(this.props.search.toUpperCase()) ||
                    user.username.toUpperCase().includes(this.props.search.toUpperCase()))
            )
        });

        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
            })}>
                <div className={css({
                })}>
                    {filteredUsers.map(user => {
                        return( <UserPreviews key={user.id}
                                              user={user}/> )
                    })}
                </div>
            </div>
        )
    }
}

export default SearchUsers