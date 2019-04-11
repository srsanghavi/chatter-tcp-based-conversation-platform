import React, { Component } from 'react'
import {css} from "emotion";
import GroupActions from '../Actions/GroupActions'
import GroupStore from "../Store/GroupStore";
import AuthStore from "../Store/AuthStore";
import UserPreviews from "./UserPreviews";

class GroupMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            groupMembers: []
        };

        this._onGroupChanged = this._onGroupChanged.bind(this);
    }

    componentWillMount() {
        GroupStore.addGroupMembersChangeListener(this._onGroupChanged);
    }

    componentDidMount() {
        GroupActions.getGroupUsers(AuthStore._getAuthUser().username, this.props.match.params.id);
        this.setState({
            groupMembers: GroupStore._getGroupMembers()
        })
    }

    componentWillUnmount(){
        GroupStore.removeGroupMembersChangeListener(this._onGroupChanged);
    }

    _onGroupChanged(){
        this.setState({
            groupMembers: GroupStore._getGroupMembers()
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
                {this.state.groupMembers.map(member => {
                    return(<UserPreviews user={member}/>)
                })}
            </div>
        )
    }
}

export default GroupMembers