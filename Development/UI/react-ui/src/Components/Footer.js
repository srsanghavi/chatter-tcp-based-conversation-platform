import React from 'react';
import {css} from 'emotion';

const Footer = () => {
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
            zIndex: 10
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
                <i className="fa fa-comments fa-2x"></i>
                <i className="fa fa-group fa-2x"></i>
                <i className="fa fa-cog fa-2x"></i>
            </div>
        </div>
    );
};

export default Footer;