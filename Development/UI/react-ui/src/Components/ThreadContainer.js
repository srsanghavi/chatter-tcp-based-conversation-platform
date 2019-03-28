import React from 'react';
import {css} from 'emotion';
import Thread from "./Thread";

const ThreadContainer = props => {
    if(props.threads == null || props.threads == undefined || props.threads == []) {
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
                <div className={css({paddingTop: '5em'})}></div>
                {props.threads.map(thread => {
                    let threadMessages = props.messages.filter(message => {
                        return message.thread_id == thread.id
                    });
                    return (
                        <Thread threadMessages={threadMessages}/>
                    )
                })}
            </div>
        )
    }
};

export default ThreadContainer;