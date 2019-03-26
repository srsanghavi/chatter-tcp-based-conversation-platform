import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const ConversationPreview = props => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: '0.05em solid gray',
            padding: '0.5em 0.5em'
        })}>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                //padding: '0 0.5em 0 0.5em',
            })}>
                <img src="./images/image.png" height="60" width="60"
                     className={css({
                         borderRadius: 50,
                     })}/>
                <span className={css({
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    padding: '0 0.5em 0 0.5em',
                })}>
                    <h4>{props.conversation.id}</h4>
                    <span className={css({
                        opacity: '0.6',
                        fontStyle: 'italic',
                    })}>
                        {props.conversation.created_on}
                    </span>
                </span>
            </div>
            <div className={css({
                padding: '0 1em'
            })}>
                <NavLink to={`/conversations`}
                         className={css({
                             color: '#342E37',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: 'gray'
                             }
                         })}>
                    <i className="fa fa-arrow-right fa-2x"></i>
                </NavLink>
            </div>
        </div>
    )
};
export default ConversationPreview;