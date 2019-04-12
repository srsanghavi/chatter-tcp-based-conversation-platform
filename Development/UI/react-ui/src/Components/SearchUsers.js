import React, { Component } from 'react'
import {css} from 'emotion';
import UserStore from "../Store/UserStore";
import UserActions from "../Actions/UserActions";
import AuthStore from "../Store/AuthStore";
import UserPreviews from "./UserPreviews";
import { NavLink } from 'react-router-dom';


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
                    display: 'flex',
                    position: 'fixed',
                    width: '100%',
                    height: '3em',
                    color: 'white',
                    border: '0.05em solid gray',
                    borderBottomColor: 'black',
                    boxShadow: '0 0 25px 0 rgba(0,0,0,0.5)',
                    backgroundColor: 'white',
                    zIndex: 5
                })}>
                    <div className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        borderRight: '0.05em solid black',
                        backgroundColor: '#CEDAE5'
                    })}>
                        <h6 className={css({
                            color: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'Titillium Web',
                            fontStyle: 'underline'
                        })}>Users</h6>
                    </div>

                    <div className={css({
                        width: '50%',
                    })}>
                        <NavLink to={'/search-groups'}
                                className={css({
                                    display: 'flex',
                                    width: '100%',
                                    height: '100%',
                                    textAlign: 'center',
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                })}>
                            <h6 className={css({
                                color: 'black',
                                fontWeight: 'bold',
                                fontFamily: 'Titillium Web',
                            })}>Groups</h6>
                        </NavLink>
                    </div>
                </div>
                <div className={css({
                    marginTop: '3em'
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