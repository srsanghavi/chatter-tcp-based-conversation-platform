import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const Header = props => {
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
            zIndex: 10
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
                <NavLink to={'./profile'}
                         className={css({
                             color: props.tab === 'profile' ? '#45AAEB' : 'white',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: props.tab === 'profile' ? '#45AAEB' : 'white'
                             }
                         })}>
                    <i className="fa fa-user-circle-o fa-2x"
                       onClick={props.profileOnClick}></i>
                </NavLink>
                <i className="fa fa-search fa-2x" onClick={props.test}></i>
            </div>
        </div>
    );
};

export default Header;