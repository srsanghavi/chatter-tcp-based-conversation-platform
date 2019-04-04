import React from 'react';
import {css} from 'emotion';
import ThreadPreview from "./ThreadPreview";
import moment from "moment/moment";

const ThreadContainer = props => {

    let previousDate = moment('0000-00-00', 'YYYY-MM-DD');

    for(let i = 0; i < props.threads.length; i++) {
        if(moment(props.threads[i].created_on).isSame(previousDate, 'day')) {
            props.threads[i].displayDate = moment(props.threads[i].created_on).format('h:mm a');
        } else if(moment(props.threads[i].created_on).isSame(previousDate, 'minute')) {
            props.threads[i].displayDate = null;
        } else {
            props.threads[i].displayDate =  moment(props.threads[i].created_on).format('MMMM Do YYYY, h:mm a');
            previousDate = moment(props.threads[i].created_on);
        }
    }

    if(props.threads === null || props.threads === undefined || props.threads === []) {
        return null
    } else {
        return (
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
                paddingBottom: '5em'
            })}>
                {props.threads.map(thread => {
                    let threadMessages = props.messages.filter(message => {
                        return message.thread_id === thread.id
                    });
                    return (
                        <ThreadPreview threadMessages={threadMessages}
                                       threadId={thread.id}
                                       conversationId={thread.conversations_id}
                                       displayDate={thread.displayDate}/>
                    )
                })}
            </div>
        )
    }
};

export default ThreadContainer;