import React from 'react';
import {css} from 'emotion';
import {NavLink} from 'react-router-dom';
import AuthStore from "../Store/AuthStore";

const GroupHeader = props => {

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
                {props.fromConversation ?
                <NavLink to={`/conversations/group-conversation/${props.conversationId}`}
                         className={css({
                             color: 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: '#45AAEB'
                             }
                         })}>
                    <i className="fa fa-arrow-left fa-2x"></i>
                </NavLink> :
                <NavLink to={`/search-groups`}
                         className={css({
                             color: 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: '#45AAEB'
                             }
                         })}>
                    <i className="fa fa-arrow-left fa-2x"></i>
                </NavLink>}
                {props.fromConversation ?
                <i className="fa fa-search fa-2x"
                   onClick={props.searchClick}
                   style={{
                       float: 'left',
                   }}></i> : null}
            </div>
        </div>
    );
};

export default GroupHeader;