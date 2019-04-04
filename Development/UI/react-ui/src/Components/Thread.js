import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import SearchBar from "./SearchBar";
import  { Redirect } from 'react-router-dom'
import ThreadStore from "../Store/ThreadStore";
import MessageActions from "../Actions/MessageActions";
import MessageStore from "../Store/MessageStore";
import MessageContainer from "./MessageContainer";


// component updates every interval (in ms)
const INTERVAL = 2000;

class Thread extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: 0,
            id: this.props.match.params.threadId,
            searchBar: false,
            search: '',
            messages: [],
            firstMessage: {},
            replies: [],
            newMessage: '',
            previousMessageCount: 0
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
    }


    componentDidMount() {
        this.interval = setInterval(() => this.update(), INTERVAL);
        if(MessageStore._getThreadMessages() !== undefined) {
            this.setState({
                previousMessageCount: this.state.messages.length,
                messages: JSON.parse(MessageStore._getThreadMessages()).result
            })
        }
        MessageActions.getMessagesInThread(localStorage.getItem('username'), this.props.match.params.threadId);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        if(MessageStore._getThreadMessages() !== undefined) {
            this.setState({
                previousMessageCount: this.state.messages.length,
                messages: JSON.parse(MessageStore._getThreadMessages()).result
            })
        }
        MessageActions.getMessagesInThread(localStorage.getItem('username'), this.props.match.params.threadId);
    }


    sendMessage() {
        const conversationId = JSON.parse(ThreadStore._getThreads()).result.filter(thread => {
            return thread.id === this.props.match.params.threadId
        })[0].conversations_id;
        MessageActions.createMessageForThread(localStorage.getItem('username'), localStorage.getItem('id'),
            this.props.match.params.threadId, "\"" + this.state.newMessage + "\"", conversationId);
        this.setState({
            newMessage: ''
        })
    }

    onMessageChange = (event) => {
        this.setState({ newMessage: event.target.value })
    };


    toggleSearch() {
        this.setState({
            searchBar: !this.state.searchBar
        })
    }

    onSearchChange(event) {
        this.setState({search: event.target.value});
    }

    renderSearchBar() {
        if(this.state.searchBar) {
            return(
                <div className={css({paddingBottom: '3em'})}>
                    <SearchBar search={this.state.search}
                               onChange={this.onSearchChange}/>
                </div>
            )
        }
    }

    renderMessages() {
        if(MessageStore._getThreadMessages() === undefined) {
            return(
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
            let threadMessages = this.state.messages.filter(message => {
                return message.thread_id === this.props.match.params.threadId
            });
            return(
                <div>
                    <MessageContainer messages={threadMessages}/>
                    <ConversationFooter onChange={this.onMessageChange}
                                        onClick={this.sendMessage}
                                        value={this.state.newMessage}/>
                </div>
            )
        }
    }

    render() {
        if(this.state.messages.length > this.state.previousMessageCount) {
            window.scrollTo(0, document.body.scrollHeight);
        }
        const conversationId = JSON.parse(ThreadStore._getThreads()).result.filter(thread => {
            return thread.id === this.props.match.params.threadId
        })[0].conversations_id;
        if (!(localStorage.getItem('loggedIn') === 'true')) {
            return <Redirect to='/login'/>
        } else {
            return (
                <div className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    overflowX: 'hidden',
                })}>
                    <div className={css({
                        paddingBottom: '5em'
                    })}>
                        <ConversationHeader search={this.state.searchBar}
                                            searchClick={this.toggleSearch}
                                            inThread={true}
                                            conversationId={conversationId}/>
                    </div>
                    {this.renderSearchBar()}

                    {this.renderMessages()}
                    {this.state.replies.map(message => {
                        return <p>{message.text}</p>
                    })}
                </div>
            );
        }
    }

}

export default Thread;