import React from 'react';
import {css} from 'emotion';
import image from './image.png'
import {NavLink} from 'react-router-dom';

const ConversationHeader = props => {
    return (
        <div className={css({
            display: 'flex',
            flex: '0 0 5em',
            position: 'fixed',
            width: '100%',
            height: '5em',
            color: 'white',
            backgroundColor: '#342E37',
            boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
            zIndex: 10
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
            <NavLink to='/'
                     className={css({
                         color: 'white',
                         textDecoration: 'none',
                         '&:hover': {
                             color: '#CEDAE5'
                         }
                     })}>
                <i className="fa fa-arrow-left fa-2x"></i>
            </NavLink>
            <img src={image} height="60" width="60"
                 className={css({
                    borderRadius: 50
            })}/>
            <i className="fa fa-cog fa-2x"></i>
            </div>
        </div>
    );
};

export default ConversationHeader;