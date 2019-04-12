import React, { Component } from 'react'
import {css} from "emotion";
import GroupActions from '../Actions/GroupActions'
import GroupStore from "../Store/GroupStore";
import AuthStore from "../Store/AuthStore";
import GroupMember from "./GroupMember";
import GroupHeader from "./GroupHeader";

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
        GroupActions.getGroupUsers(AuthStore._getAuthUser().username, this.props.match.params.id);
    }

    componentDidMount() {
        this.setState({
            groupMembers: GroupStore._getGroupMembers()
        })
    }

    componentWillUnmount(){
        GroupStore.removeGroupMembersChangeListener(this._onGroupChanged);
        GroupStore._clearGroupMembers()
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
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <GroupHeader fromConversation={false}/>
                </div>
                {this.state.groupMembers.length > 0 ?
                this.state.groupMembers.map(member=> {
                    return(<GroupMember key={member.id}
                                        user={member}/>)
                }) : null}
            </div>
        )
    }
}

export default GroupMembers