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
            padding: '0.5em 0.5em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        })}>
            <span className={css({
                width: '25%'
            })}>
                <img src="./images/image.png" height="60" width="60"
                     className={css({
                         borderRadius: 50,
                     })}/>
            </span>
            <span className={css({
                width: '50%',
                textAlign: 'left',
                whiteSpace: 'nowrap',
                textOverflow: 'ellipsis',
                overflow: 'hidden',
                padding: '0 0.5em 0 0.5em',
            })}>
                <p>{props.user.username}</p>
            </span>
            <div className={css({
                padding: '0 1em',
                width: '25%',
                float: 'right'
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