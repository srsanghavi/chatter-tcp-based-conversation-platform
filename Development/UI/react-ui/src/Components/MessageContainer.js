import React, {Component} from 'react';
import {css} from 'emotion';
import moment from 'moment';
import Message from "./Message";
import MessageStore from '../Store/MessageStore';

class MessageContainer extends Component {

    constructor(props){
        super(props);
        this.state={
            firstMessage : {
                createdOn: "00",
                text: "--",
            },
        }
        this._onMessagesChanged = this._onMessagesChanged.bind(this);
    }

    componentWillMount(){
        MessageStore.addThreadMessagesChangeListner(this._onMessagesChanged);
    }

    componentWillUnmount(){
        MessageStore.removeThreadMessagesChangeListner(this._onMessagesChanged);
    }

    _onMessagesChanged(){
        const msgs = MessageStore._getThreadMessages();
        this.setState({
            firstMessage: msgs[0],
        })
        window.scrollTo(0, document.body.scrollHeight);
    }

    render(){
        let props = this.props;
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
    
        let firstMessage = this.state.firstMessage;
        
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
                        <h5 className={css({
                            // textDecoration: 'underline'
                        })}>Viewing Thread:</h5>
                        <h6 className={css({
                            opacity: '0.75',
                            fontSize: '0.8em',
                        })}>{this.state.firstMessage.createdOn}</h6>
                        <h6>{this.state.firstMessage.text}</h6>
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
                                <Message message={message}/>
                            )
                        })}
                    </div>
                </div>
            )
        }
    }
    
};


export default MessageContainer;