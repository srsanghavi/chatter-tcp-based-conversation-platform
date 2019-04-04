import React, { Component } from 'react'
import { css } from 'emotion';
import ThreadStore from "../Store/ThreadStore";
import MessageStore from "../Store/MessageStore";
import MessageActions from "../Actions/MessageActions";
import ThreadActions from "../Actions/ThreadActions";

// component updates every interval (in ms)
const INTERVAL = 500;

// count of intervals after which log in will fail. interval count is reset at each step
const TIMEOUT = 15;

const status = {
    PENDING: 'pending',
    FAILURE: 'failure',
    SUCCESS: 'success'
};

class LoadingMessages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversationId: props.id,
            status: status.PENDING,
            interval: 0,
            threadsLoaded: false,
            messagesLoaded: false,
            finishedLoading: (ThreadStore._getThreads() !== undefined) && (MessageStore._getMessages() !== undefined)
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), INTERVAL);
        ThreadActions.getThreadsInConversation(localStorage.getItem('username'), this.state.conversationId)
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        console.log(this.state)
        if (!this.state.finishedLoading) {
            if (!this.state.threadsLoaded) {
                this.loadThreads()
            } else if (!this.state.messagesLoaded) {
                this.loadMessages()
            } else {
                this.setState({
                    status: status.SUCCESS
                });
                clearInterval(this.interval);
            }
        } else {
            clearInterval(this.interval);
        }
    }


    loadThreads() {
        if(ThreadStore._getThreads() === undefined){
            if(this.state.interval < TIMEOUT) {
                this.setState({ interval: this.state.interval + 1 });
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else {
            this.setState({
                status: status.PENDING,
                interval: 0,
                threadsLoaded: true,
                finishedLoading: false
            });
            MessageStore._clearMessages();
            MessageActions.getMessagesInConversation(localStorage.getItem('username'), this.state.conversationId)
        }
    }

    loadMessages() {
        if(MessageStore._getMessages() === undefined){
            if(this.state.interval < TIMEOUT) {
                this.setState({ interval: this.state.interval + 1 });
            } else {
                this.setState({ status: status.FAILURE });
                clearInterval(this.interval);
            }
        } else {
            setTimeout(function(){}, 2000);
            this.setState({
                status: status.PENDING,
                interval: 0,
                messagesLoaded: true,
                finishedLoading: true
            });
        }
    }


    render() {
        if(this.state.finishedLoading) {
            return(
                null
            );
        } else if(this.state.status === status.FAILURE) {
            return (
                <div className={css({
                    textAlign: 'center',
                    paddingTop: '7em'
                })}>
                    <p className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Failed to load conversation...
                    </p>
                </div>
            )
        } else if(this.state.status === status.PENDING) {
            return (
                <div className={css({
                    textAlign: 'center',
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translateY(-50%) translateX(-50%)',
                })}>
                    <div className="lds-ring">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            )
        } else {
            return (
                <div className={css({
                })}>
                    <p className={css({
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold',
                        paddingBottom: '1em',
                        color: '#342E37'
                    })}>
                        Failed to load conversation...
                    </p>
                </div>
            )
        }
    }


}

export default LoadingMessages