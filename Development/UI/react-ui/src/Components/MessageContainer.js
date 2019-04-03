import React from 'react';
import {css} from 'emotion';
import moment from 'moment';
import Message from "./Message";

const MessageContainer = props => {

    let previousDate = moment('0000-00-00', 'YYYY-MM-DD');

    for(let i = 0; i < props.messages.length; i++) {
        if(moment(props.messages[i].createdOn).isSame(previousDate, 'minute')) {
            props.messages[i].displayDate = null;
        } else if(moment(props.messages[i].createdOn).isSame(previousDate, 'day')) {
            props.messages[i].displayDate = moment(props.messages[i].createdOn).format('h:mm a');
        } else {
            props.messages[i].displayDate =  moment(props.messages[i].createdOn).format('MMMM DD YYYY, h:mm a');
            previousDate = moment(props.messages[i].createdOn);
        }
    }

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
                        <Message key={message.id}
                                 message={message}/>
                    )
                })}
            </div>
        )
    }
};


export default MessageContainer;