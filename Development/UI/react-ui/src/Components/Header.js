import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const Header = props => {

    // const PATH = window.location.pathname.split('/');

    return (
        <div className={css({
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '5em',
            color: 'white',
            padding: '0 0.75em',
            backgroundColor: '#342E37',
            boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
            zIndex: 10,
            border: '0.05em solid black',
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
                {props.tab === 'profile' ?
                <NavLink to={props.previousTab === 'search' ? '../search' : '../conversations'}
                         className={css({
                             color: 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: '#45AAEB'
                             }
                         })}>
                    <i className="fa fa-arrow-left fa-2x"
                       onClick={props.previousTab === 'search' ? props.searchOnClick : props.conversationsOnClick}></i>
                </NavLink> :
                <NavLink to={`./profile/${props.user.username}`}
                         className={css({
                             color: props.tab === 'profile' ? '#45AAEB' : 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: props.tab === 'profile' ? '#45AAEB' : 'white'
                             }
                         })}>
                    <i className="fa fa-user-circle-o fa-2x"
                       onClick={props.profileOnClick}></i>
                </NavLink>}
                {props.tab === 'conversations' ?
                    <i className="fa fa-bullhorn fa-2x"
                       onClick={props.broadcastClick}
                       style={{
                            color: props.broadcast ? '#45AAEB' : 'white',
                       }}></i> : null }
                {props.tab === 'settings' ? null :
                    props.tab === 'profile' && props.previousTab === 'search' ? null :
                    props.tab === 'profile' ?
                    <NavLink to={`../edit-profile/${props.user.username}`}>
                        <i className="fa fa-edit fa-2x"
                           style={{
                               float: 'left',
                               color: window.location.pathname ===  '/edit-profile' ? '#45AAEB' : 'white',
                           }}></i>
                    </NavLink> :
                    <i className="fa fa-search fa-2x"
                       onClick={props.searchClick}
                       style={{
                           float: 'left',
                           color: props.search ? '#45AAEB' : 'white',
                       }}></i>}
            </div>
        </div>
    );
};

export default Header;