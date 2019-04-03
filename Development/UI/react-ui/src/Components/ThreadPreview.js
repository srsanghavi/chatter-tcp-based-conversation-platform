import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const ThreadPreview = props => {

    if(props.threadMessages.length === 0) {
        return null
    } else {
        return(
            <div className={css({
                width: '100%',
                textAlign: 'center'
            })}>
                <p className={css({
                    opacity: '0.75',
                    fontSize: '0.75em',
                    padding: '0.5em'
                })}>{props.displayDate}</p>
                    <div className={css({
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: props.threadMessages[0].sender_id.toString() === localStorage.getItem('id') ?
                                        'flex-end' : 'flex-start',
                        margin: '0.5em',
                        textAlign: 'left',
                        fontSize: '1em',
                        backgroundColor: 'white',
                    })}>
                        <NavLink to={`/thread/${props.threadId}`}
                                 className={css({
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            border: '1px solid black',
                            wordWrap: 'break-word',
                            maxWidth: '45%',
                            backgroundColor: props.threadMessages.length > 1 ? '#edd0b7' : 'white',
                            color: 'black',
                            textDecoration: 'none'
                        })}>
                            {props.threadMessages[0].text}
                        </NavLink>
                    </div>
            </div>
        )
    }
};

export default ThreadPreview;