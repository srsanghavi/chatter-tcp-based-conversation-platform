import React, { Component } from 'react'
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';



class GroupSettings extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }


    render() {
        return(
            <div>
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
                        <i className="fa fa-angle-down fa-2x"
                           onClick={this.createGroupOnClick}></i>
                    </NavLink>
                </div>
                {this.renderGroupForm()}
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
                        <p onClick={this.logOut}>Log Out</p>
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
                        <p onClick={this.deleteUser}>Delete Account</p>
                    </NavLink>
                </div>
            </div>
        )
    }
};

export default GroupSettings;