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

    let firstMessage = props.messages[0];
    
    if(props.messages === null || props.messages === undefined || props.messages === []) {
        return null
    } else {
        return (
            <div>
                <div className={css({
                    border: '1px solid black',
                    backgroundColor: '#eed6c1',
                    padding: '0.5em',
                    marginBottom: '0.5em',
                    fontWeight: 'bold',
                    boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
                })}>
                    {/* <h5 className={css({
                        textDecoration: 'underline'
                    })}>Viewing Thread:</h5>
                    <h6 className={css({
                        opacity: '0.75',
                        fontSize: '0.8em',
                    })}>{props.messages[0].createdOn}</h6>
                    <h6>{props.messages[0].text}</h6> */}
                </div>
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
            </div>
        )
    }
};


export default MessageContainer;