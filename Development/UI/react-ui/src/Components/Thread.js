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
import AuthStore from '../Store/AuthStore';


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

        this._onMessagesChanged = this._onMessagesChanged.bind(this);
        this._onNewMessageReceieved = this._onNewMessageReceieved.bind(this);

    }

    _onNewMessageReceieved(){
        MessageActions.getMessagesInThread(AuthStore._getAuthUser().username, this.props.match.params.threadId);
    }

    newMessageHere(){
        if(window.newNoti){
            const notiMessage =(window.newNotiContent);
            
            if(notiMessage.conversation_id==this.props.match.params.id){
                MessageActions.getMessagesInThread(AuthStore._getAuthUser().username, this.props.match.params.threadId);
            }
            window.newNotiContent = "";
            window.newNoti = false;
        }
    }

    componentDidMount() {
        // this.interval = setInterval(() => this.update(), INTERVAL);
        // if(MessageStore._getThreadMessages() !== undefined) {
        //     this.setState({
        //         previousMessageCount: this.state.messages.length,
        //         messages: JSON.parse(MessageStore._getThreadMessages()).result
        //     })
        // }
        MessageStore.addThreadMessagesChangeListner(this._onMessagesChanged);
        MessageStore.addNewMessageListener(this._onNewMessageReceieved);
        MessageActions.getMessagesInThread(AuthStore._getAuthUser().username, this.props.match.params.threadId);
        this.interval = setInterval(() => this.newMessageHere(), INTERVAL);

    }

    componentWillUnmount() {
        clearInterval(this.interval);
        MessageStore.removeThreadMessagesChangeListner(this._onMessagesChanged);
        MessageStore.removeNewMessageListener(this._onNewMessageReceieved);

    }

    _onMessagesChanged(){
        const _messages = MessageStore._getThreadMessages();
        this.setState({
            previousMessageCount: this.state.messages.length,
            messages: _messages,
        })
    }


    sendMessage() {
        const conversationId = this.props.match.params.id;
        MessageActions.createMessageForThread(AuthStore._getAuthUser().username, AuthStore._getAuthUser().id,
            this.props.match.params.threadId, this.state.newMessage , conversationId,0);
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

    renderMessages(filteredMessages) {

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

            return(
                <div>
                    <MessageContainer messages={filteredMessages}/>
                    <ConversationFooter onChange={this.onMessageChange}
                                        onClick={this.sendMessage}
                                        value={this.state.newMessage}
                                        conversation_id={this.props.match.params.id}
                                        threadid={this.props.match.params.threadId}/>
                </div>
            )
        }
    }

    render() {

        const filteredMessages = this.state.messages.filter(message => {
            return message.text.indexOf(this.state.search) !== -1
        });

            window.scrollTo(0, document.body.scrollHeight);
        const conversationId = 0;
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
                                            conversationId={this.props.match.params.id}/>
                    </div>
                    {this.renderSearchBar()}

                    {this.renderMessages(filteredMessages)}
                    {this.state.replies.map(message => {
                        return <p>{message.text}</p>
                    })}
                </div>
            );
        }
    }

}

export default Thread;