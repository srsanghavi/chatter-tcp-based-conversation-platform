import React from 'react';
import {css} from 'emotion';
import MessagePreview from "./MessagePreview";

const MessageContainer = props => {
    if(props.messages == null || props.messages == undefined || props.messages == []) {
        return null
    } else {
        return (
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
                paddingBottom: '5em',
            })}>
                {props.messages.map(message => {
                    return (
                        <MessagePreview message={message}/>
                    )
                })}
            </div>
        )
    }
};

export default MessageContainer;