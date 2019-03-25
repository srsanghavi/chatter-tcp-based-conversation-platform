import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';


const Footer = props => {
    return (
        <div className={css({
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '5em',
            bottom: 0,
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
                padding: '0 0.75em',
                color: 'white',
                textDecoration: 'none'
            })}>
                <NavLink to={'./conversations'}
                         className={css({
                             color: props.tab === 'conversations' ? '#45AAEB' : 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: props.tab === 'conversations' ? '#45AAEB' : 'white'
                             }
                         })}>
                    <i className="fa fa-comments fa-2x"
                       onClick={props.conversationsOnClick}></i>
                </NavLink>
                <NavLink to={'./search'}
                         className={css({
                             color: props.tab === 'search' ? '#45AAEB' : 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: props.tab === 'search' ? '#45AAEB' : 'white'
                             },
                         })}>
                    <i className="fa fa-group fa-2x"
                       onClick={props.searchOnClick}></i>
                </NavLink>
                <NavLink to={'./settings'}
                    className={css({
                        color: props.tab === 'settings' ? '#45AAEB' : 'white',
                        textDecoration: 'none',
                        '&:hover': {
                            color: props.tab === 'settings' ? '#45AAEB' : 'white'
                        }
                    })}>
                    <i className="fa fa-cog fa-2x"
                       onClick={props.settingsOnClick}></i>
                </NavLink>

            </div>
        </div>
    );
};

export default Footer;