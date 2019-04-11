import React, { Component } from 'react'
import AuthStore from "../Store/AuthStore";
import GroupPreviews from "./GroupPreviews";
import GroupStore from "../Store/GroupStore";
import GroupActions from "../Actions/GroupActions";
import {css} from "emotion";
import { NavLink } from 'react-router-dom';


class SearchGroups extends Component {
    constructor(props) {
        super(props);
        this.state = {
            groups: []
        };

        this._onGroupsChanged = this._onGroupsChanged.bind(this);
    }

    componentWillMount() {
        GroupStore.addGroupsChangeListener(this._onGroupsChanged);
        GroupActions.getAllGroups(AuthStore._getAuthUser().username);
    }

    componentDidMount(){
        this.setState({
            groups: GroupStore._getAllGroups()
        })
    }

    componentWillUnmount(){
        GroupStore.removeGroupsListener(this._onGroupsChanged);
    }

    _onGroupsChanged(){
        this.setState({
            groups: GroupStore._getAllGroups()
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
                        width: '50%',
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
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '50%',
                        borderLeft: '0.05em solid black',
                        backgroundColor: '#CEDAE5'
                    })}>
                        <h6 className={css({
                            color: 'black',
                            fontWeight: 'bold',
                            fontFamily: 'Titillium Web',
                            fontStyle: 'underline'
                        })}>Groups</h6>
                    </div>
                </div>
                <div className={css({
                    marginTop: '3em'
                })}>
                    {this.state.groups.map(group => {
                        return( <GroupPreviews group={group}/> )
                    })}
                </div>
            </div>
        )
    }
}

export default SearchGroups