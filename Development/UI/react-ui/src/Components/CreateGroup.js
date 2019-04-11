import React, { Component } from 'react'
import {css} from 'emotion';
import UserStore from "../Store/UserStore";
import UserActions from "../Actions/UserActions";
import AuthStore from "../Store/AuthStore";
import UserPreviews from "./UserPreviews";
import { NavLink } from 'react-router-dom';


class CreateGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            groups: []
        };

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
                        width: '33.3%',
                    })}>
                        <NavLink to={'/search-users'}
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
                            })}>Users</h6>
                        </NavLink>
                    </div>
                    <div className={css({
                        width: '33.3%',
                        borderLeft: '0.05em solid black',
                        borderRight: '0.05em solid black',
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
                    <div className={css({
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '33.3%',
                        backgroundColor: '#CEDAE5'
                    })}>
                        <h6 className={css({
                            color: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'Titillium Web',
                            fontStyle: 'underline'
                        })}>Create Group</h6>
                    </div>
                </div>
                <div className={css({
                    marginTop: '3em'
                })}>
                    {this.state.users.map(user => {
                        return( <UserPreviews key={user.id}
                                              user={user}/> )
                    })}
                </div>
            </div>
        )
    }
}

export default CreateGroup