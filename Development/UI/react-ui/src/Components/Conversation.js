import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ThreadContainer from "./ThreadContainer";
import SearchBar from "./SearchBar";
import  { Redirect } from 'react-router-dom'
import ThreadActions from "../Actions/ThreadActions";
import ThreadStore from "../Store/ThreadStore";
import MessageActions from "../Actions/MessageActions";
import MessageStore from "../Store/MessageStore";
import ConversationStore from "../Store/ConversationStore";
import AuthStore from '../Store/AuthStore';
import {EmojiPicker} from 'emoji-picker-react';
import {jsemoji} from 'emoji-js';


// component updates every interval (in ms)
const INTERVAL = 500;

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            interval: 0,
            id: this.props.match.params.id,
            searchBar: false,
            search: '',
            threads: [],
            messages: [],
            newMessage: '',
            previousThreadCount: 0,
            editProfilePic: false,
            isGroup: false,
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        // this.onMessageChange = this.onMessageChange.bind(this);

        this._onThreadsChanged = this._onThreadsChanged.bind(this);
        this._onMessageschanged = this._onMessageschanged.bind(this);

        this._onNewMessageReceieved = this._onNewMessageReceieved.bind(this);
        this.handleEmojiClick = this.handleEmojiClick.bind(this);

        console.log(window.location.pathname.split('/'))

    }

    scrollToBottom() {
        window.scrollTo(0, document.body.scrollHeight);
      }
      

    handleEmojiClick=(code,emoji) => {
        // let emojiPic = jsemoji.replace_colons(`:${emoji.name}:`);
        // this.setState({
        // newMessage: event.target.value + emojiPic,
        // });
    }
    componentWillMount(){
        ThreadStore.addThreadsChangeListener(this._onThreadsChanged);
        MessageStore.addMessagesChangeListener(this._onMessageschanged);
        MessageStore.addNewMessageListener(this._onNewMessageReceieved);
        // console.log(this.props)
        // ThreadActions.getThreadsInConversation(localStorage.getItem("username"),this.props.match.params.id);
        MessageActions.getMessagesInConversation(AuthStore._getAuthUser().username,this.props.match.params.id);

        this.interval = setInterval(() => this.newMessage(), INTERVAL);
    }

   
    componentDidMount(){
        this.scrollToBottom();
        const PATH = window.location.pathname.split('/');
        this.setState({
            isGroup: PATH[PATH.length - 2] === "group-conversation"
        });
    }
    componentDidUpdate(){
        this.scrollToBottom();
    }

    componentWillUnmount(){
        ThreadStore.removeThreadsChangeListener(this._onThreadsChanged);
        MessageStore.removeMessagesChangeListener(this._onMessageschanged);
        MessageStore.removeNewMessageListener(this._onNewMessageReceieved);
        clearInterval(this.interval);

    }
    _onThreadsChanged(){
        const _threads = ThreadStore._getThreads();
        console.log(_threads);
        this.setState({
            threads: _threads,
        });
    }

    _onMessageschanged(){
        const _messages = MessageStore._getMessages().result;
        if(!_messages){
            MessageActions.getMessagesInConversation(AuthStore._getAuthUser().username,
                                                     AuthStore._getAuthUser().id,
                                                     this.props.match.params.id);
        }
        else{
            var _threads = new Set(_messages.map(msg => msg.thread_id));

            var thread_messages = [];
            _threads.forEach(t => {
                thread_messages.push({
                    thread_id: t,
                    messages: _messages.filter(msg => msg.thread_id==t),
                })
            });

            
            this.setState({
                threads: thread_messages,
            })
        }
    }

    _onNewMessageReceieved(){
        console.log("new Message")
        MessageActions.getMessagesInConversation(AuthStore._getAuthUser().username,this.props.match.params.id);
    }

    newMessage(){
        if(window.newNoti){
            const notiMessage =(window.newNotiContent);
            console.log(notiMessage);
            
            if(notiMessage.conversation_id==this.props.match.params.id){
                MessageActions.getMessagesInConversation(AuthStore._getAuthUser().username,this.props.match.params.id);
            }
            window.newNotiContent = "";
            window.newNoti = false;
        }
    }

    sendMessage() {
        var newMesage = this.state.newMessage;
        newMesage = newMesage.replace('\n',' ');
        console.log(newMesage);

        MessageActions.createMessageForThread(AuthStore._getAuthUser().username,
                                              AuthStore._getAuthUser().id,
                                               -1, 
                                                newMesage, 
                                               this.props.match.params.id,
                                               0);
            this.setState({
            newMessage: '',
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

  

   

    renderThreads() {
        // if((ThreadStore._getThreads() === undefined || MessageStore._getMessages() === undefined)
        //         && this.state.threads.length === 0) {
        //     // return(
            //     <div className={css({
            //         textAlign: 'center',
            //         position: 'absolute',
            //         left: '50%',
            //         top: '50%',
            //         transform: 'translateY(-50%) translateX(-50%)',
            //     })}>
            //         <div className="lds-ring">
            //             <div></div>
            //             <div></div>
            //             <div></div>
            //             <div></div>
            //         </div>
            //     </div>
            // )
        // } else {
            return(
                <div>
                    <ThreadContainer threads={this.state.threads}
                                     conversation_id = {this.props.match.params.id}
                                     isGroup={this.state.isGroup}/>
                    <ConversationFooter onChange={this.onMessageChange}
                                        onClick={this.sendMessage}
                                        value={this.state.newMessage}
                                        conversation_id={this.props.match.params.id}
                                        threadid={-1}
                                       />
                </div>
            )
        // }
    }

    render() {
        if(this.state.threads.length > this.state.previousThreadCount) {
            window.scrollTo(0, document.body.scrollHeight);
        }
        if (!(localStorage.getItem('loggedIn') === 'true')) {
            return <Redirect to='/login'/>
        } else {
            return (
                <div ref={(div) => {
                    this.messageList = div;
                  }}>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    width: '100%',
                    overflowX: 'hidden',
                    })} >
                    
                    <div className={css({
                        paddingBottom: '5em'
                    })}>
                        <ConversationHeader search={this.state.searchBar}
                                            searchClick={this.toggleSearch}
                                            inThread={false}
                                            isGroup={this.state.isGroup}
                                            conversationId={this.state.id}/>
                    </div>
                    {this.renderSearchBar()}
                    {this.renderThreads()}
                </div>
                </div>
            );
        }
    }

}

export default Conversation;