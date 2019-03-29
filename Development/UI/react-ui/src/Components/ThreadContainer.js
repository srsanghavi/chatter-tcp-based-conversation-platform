import React from 'react';
import {css} from 'emotion';
import ThreadPreview from "./ThreadPreview";

const ThreadContainer = props => {
    if(props == null || props.threads == null || props.threads == undefined || props.threads == []) {
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
                {props.threads.map(thread => {
                    let threadMessages = props.messages.filter(message => {
                        return message.thread_id == thread.id
                    });
                    return (
                        <ThreadPreview threadMessages={threadMessages}
                                       threadId={thread.id}
                                       conversationId={thread.conversations_id}/>
                    )
                })}
            </div>
        )
    }
};

export default ThreadContainer;