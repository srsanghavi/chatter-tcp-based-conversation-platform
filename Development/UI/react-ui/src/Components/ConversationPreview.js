import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import ThreadStore from "../Store/ThreadStore";
import MessageStore from "../Store/MessageStore";

const ConversationPreview = props => {
    return (
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: '0.05em solid gray',
            padding: '0.5em 0.5em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
                <span className={css({
                    width: '25%',
                })}>
                    <img src="./images/image.png" height="60" width="60"
                         className={css({
                             borderRadius: 50,
                         })}/>
                </span>
                <span className={css({
                    width: '50%'
                })}>
                    <h5>{props.conversation.id}</h5>
                    <h6 className={css({opacity: '0.5'})}>{props.conversation.created_on}</h6>
                </span>
                <span className={css({
                    width: '25%',
                })}>
                <NavLink to={`./conversations/${props.conversation.id}`}
                         className={css({
                             color: 'black',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: '#45AAEB'
                             }
                         })}
                         onClick={() => {
                             ThreadStore._clearThreads();
                             MessageStore._clearMessages();
                         }}>
                    <i className="fa fa-angle-right fa-2x"
                       style={{float: 'right'}}></i>
                </NavLink>
            </span>
            </div>
        </div>
    );
};
export default ConversationPreview;