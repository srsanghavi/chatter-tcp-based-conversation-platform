import React, { Component } from 'react'
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import GroupHeader from "./GroupHeader";



class GroupSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            groupName: ''
        };

        this.changeGroupName = this.changeGroupName.bind(this);
        this.onGroupNameChange = this.onGroupNameChange.bind(this);

    }

    changeGroupName() {
        this.setState({
            creatingGroup: !this.state.creatingGroup,
            groupName: ''
        })
    }

    onGroupNameChange(event) {
        this.setState({
            groupName: event.target.value
        })
    }

    renderGroupForm() {
        return(
            this.state.creatingGroup ?
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
                        <button className="btn btn-outline-primary">Submit</button>
                    </div>
                </div>
                : null
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
                                 id={this.state.id}/>
                </div>
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
                        <i className="fa fa-angle-down fa-2x"
                           onClick={this.changeGroupName}></i>
                    </NavLink>
                </div>
                {this.renderGroupForm()}
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
                        <i className="fa fa-angle-right fa-2x"></i>
                    </NavLink>
                </div>
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
                        <i className="fa fa-angle-right fa-2x"></i>
                    </NavLink>
                </div>
            </div>
        )
    }
};

export default GroupSettings;