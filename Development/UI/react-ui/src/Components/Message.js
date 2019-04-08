import React from 'react';
import {css} from 'emotion';
import AuthStore from '../Store/AuthStore';

const Message = props => {

    return(
        <div className={css({
            width: '100%',
            textAlign: 'center'
        })}>
            <p className={css({
                opacity: '0.5',
                fontSize: '0.75em',
                padding: '0.2em'
            })}>{props.message.displayDate}</p>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: props.message.sender_id.toString() == AuthStore._getAuthUser().id ?
                                'flex-end' : 'flex-start',
                margin: '0.5em',
                textAlign: 'left',
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
        </div>
    )
};

export default Message;