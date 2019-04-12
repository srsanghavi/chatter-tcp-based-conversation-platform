import React, { Component } from 'react'
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import GroupHeader from "./GroupHeader";



class GroupSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id
        };

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
                    <p>Create New Group</p>
                    <NavLink to={'/settings'}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <i className="fa fa-angle-down fa-2x"></i>
                    </NavLink>
                </div>
                <div className={css({
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <NavLink to={'/settings'}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <p>Log Out</p>
                    </NavLink>
                </div>
                <div className={css({
                    borderBottom: '1px solid gray',
                    padding: '1em',
                    fontFamily: 'Titillium Web',
                    fontWeight: 'bold',
                    textAlign: 'left'
                })}>
                    <NavLink to={'/settings'}
                             className={css({
                                 color: 'black',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <p>Delete Account</p>
                    </NavLink>
                </div>
            </div>
        )
    }
};

export default GroupSettings;