import React, { Component } from 'react';
import {css} from 'emotion';
import image from './image.png';
import DataService from "./Data";
import {NavLink} from 'react-router-dom';

class ConversationPreview extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: props.conversation,
            sender: '',
            isGroup: false,
            name: ''
        };
        this.getLastMessageSender();
        this.getGroupOrUserName();
    }


    getLastMessage() {
        let lastThread = this.state.conversation.threads[this.state.conversation.threads.length -1];
        let lastMessage = lastThread.messages[lastThread.messages.length - 1];
        return lastMessage.text;
    }

    getGroupOrUserName() {
        DataService.getGroupOrUserByConversationId(this.state.conversation.id)
            .then(response => {
                if(DataService.isGroupConversation(this.state.conversation.id)) {
                    this.setState({
                        isGroup: true,
                        name: response.name
                    })
                } else if(DataService.isUserConversation(this.state.conversation.id)) {
                    DataService.getUserById(response.users.find(user => user.id != localStorage.getItem('id')).id)
                        .then(user => {
                            this.setState({
                                name: user.username
                            })
                        })
                }
            })
    }

    getLastMessageSender() {
        let lastThread = this.state.conversation.threads[this.state.conversation.threads.length -1];
        let lastMessage = lastThread.messages[lastThread.messages.length - 1];
        DataService.getUserById(lastMessage.sender_id)
            .then(response => {
                this.setState({
                    sender: response.username
                })
            })
    }


    render() {
        return (
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                width: '100%',
                borderRadius: '0.25em',
                border: '1px solid #342E37',
                padding: '0.5em 0.5em'
            })}>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'row',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    //padding: '0 0.5em 0 0.5em',
                })}>
                <img src={image} height="60" width="60"
                     className={css({
                         borderRadius: 50,
                     })}/>
                <span className={css({
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    padding: '0 0.5em 0 0.5em',
                })}>
                    <h4>{this.state.name}</h4>
                    <span className={css({
                        opacity: '0.6',
                        fontStyle: 'italic',
                    })}>
                        {this.state.sender}: {this.getLastMessage()}
                    </span>
                </span>
                </div>
                <div className={css({
                    padding: '0 1em'
                })}>
                    <NavLink to={`/conversation/${this.state.conversation.id}`}
                    className={css({
                        color: 'black',
                        textDecoration: 'none',
                        '&:hover': {
                            color: '#342E37'
                        }
                    })}>
                        <i className="fa fa-arrow-right fa-2x"></i>
                    </NavLink>
                </div>
            </div>
        )
    }
}

export default ConversationPreview;