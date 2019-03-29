import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ThreadContainer from "./ThreadContainer";
import SearchBar from "./SearchBar";
import  { Redirect } from 'react-router-dom'
import ThreadActions from "../Actions/ThreadActions";
import UserStore from "../Store/UserStore";
import ThreadStore from "../Store/ThreadStore";
import MessageActions from "../Actions/MessageActions";
import MessageStore from "../Store/MessageStore";
import LoadingMessages from "./LoadingMessages";


// component updates every interval (in ms)
const INTERVAL = 5000;

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
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
    }

    // componentWillMount(){
    //     ThreadStore.addChangeListener(this._onChange);
    // }
    //
    // componentWillUnmount(){
    //     ThreadStore.removeChangeListener(this._onChange);
    //     clearInterval(this.interval);
    // }

    componentDidMount() {
        this.interval = setInterval(() => this.update(), INTERVAL);
        if(MessageStore._getMessages() != undefined &&
            JSON.parse(MessageStore._getMessages()).result.length !== this.state.messages.length) {
            this.updateThreads();
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            if(ThreadStore._getThreads() != undefined) {
                this.setState({
                    threads: JSON.parse(ThreadStore._getThreads()).result
                })
            }
            if(MessageStore._getMessages() != undefined) {
                this.setState({
                    messages: JSON.parse(MessageStore._getMessages()).result
                })
            }
            MessageActions.getMessagesInConversation(localStorage.getItem('username'), this.props.match.params.id);
        }

        //MessageActions.getMessagesInConversation(localStorage.getItem('username'), this.props.match.params.id);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
        if(MessageStore._getMessages() != undefined &&
            JSON.parse(MessageStore._getMessages()).result.length !== this.state.messages.length) {
            this.updateThreads();
            window.scrollTo(0, document.body.scrollHeight);
        } else {
            if(ThreadStore._getThreads() != undefined) {
                this.setState({
                    threads: JSON.parse(ThreadStore._getThreads()).result
                })
            }
            if(MessageStore._getMessages() != undefined) {
                this.setState({
                    messages: JSON.parse(MessageStore._getMessages()).result
                })
            }
            MessageActions.getMessagesInConversation(localStorage.getItem('username'), this.props.match.params.id);
        }
    }

    updateThreads() {
        if(ThreadStore._getThreads() != undefined) {
            this.setState({
                threads: JSON.parse(ThreadStore._getThreads()).result
            })
        }
        if(MessageStore._getMessages() != undefined) {
            this.setState({
                messages: JSON.parse(MessageStore._getMessages()).result
            })
        }
        ThreadActions.getThreadsInConversation(localStorage.getItem('username'), this.props.match.params.id)

    }

    sendMessage() {
        console.log(this.state.newMessage);
        MessageActions.createMessageForThread(localStorage.getItem('username'), localStorage.getItem('id'),
            -1, "\"" + this.state.newMessage + "\"", this.props.match.params.id);
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

    renderThreads() {
        if((ThreadStore._getThreads() == undefined || MessageStore._getMessages() == undefined)
                && this.state.threads.length === 0) {
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
                    <ThreadContainer threads={this.state.threads}
                                     messages={this.state.messages}/>
                    <ConversationFooter onChange={this.onMessageChange}
                                        onClick={this.sendMessage}
                                        value={this.state.newMessage}/>
                </div>
            )
        }
    }

    render() {
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
                                            inThread={false}/>
                    </div>
                    {this.renderSearchBar()}
                    {this.renderThreads()}
                    {/*<ConversationFooter onChange={this.onMessageChange}*/}
                                        {/*onClick={this.sendMessage}/>*/}
                    {/*{this.renderSearchBar()}*/}
                    {/*<ThreadContainer threads={this.state.threads}/>*/}
                    {/*<div className={css({paddingBottom: '5em'})}></div>*/}
                    {/*<ConversationFooter onChange={this.onMessageChange}*/}
                    {/*onClick={this.sendMessage}*/}
                    {/*value={this.state.newMessageText}/>*/}
                    {/*<h1 className={css({padding: '3em'})}>{this.state.conversation}</h1>*/}
                </div>
            );
        }
    }

}

export default Conversation;