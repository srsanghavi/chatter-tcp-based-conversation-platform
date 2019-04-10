import React, { Component } from 'react'
import {css} from "emotion";
import GroupMember from './GroupMember'

class GroupMembers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            groupMembers: []
        }
    }

    componentDidMount() {
        // GroupActions.getGroupUsers(localStorage.getItem('username'), this.props.match.params.id);
        // setTimeout(function(){}, 3000);
        // this.setState({
        //    groupMembers: JSON.parse(GroupStore._getGroupUsers()).result
        // })
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
                    return(<GroupMember user={member}/>)
                })}
            </div>
        )
    }
}

export default GroupMembers