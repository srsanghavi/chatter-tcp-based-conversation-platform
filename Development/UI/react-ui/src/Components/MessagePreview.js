import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';


const MessagePreview = props => {

    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            margin: '0.5em',
            fontSize: '1em',
            backgroundColor: 'white',
        })}>
            <p className={css({
                padding: '0.5em',
                borderRadius: '0.25em',
                border: '1px solid black',
                wordWrap: 'break-word',
                maxWidth: '45%',
                color: 'black',
                textDecoration: 'none'
            })}>
                {props.message.text}
            </p>
        </div>
    )
};

export default MessagePreview;