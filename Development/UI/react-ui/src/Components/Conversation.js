import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ThreadContainer from "./ThreadContainer";
import DataService from "./Data";
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
            threadsLoaded: false,
            messagesLoaded: false,
            finishedLoading: false,
            id: this.props.match.params.id,
            searchBar: false,
            search: '',
            newMessageText: '',
            threads: [],
            messages: [],
        };

        this.toggleSearch = this.toggleSearch.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

        // this.sendMessage = this.sendMessage.bind(this);
        // this.onMessageChange = this.onMessageChange.bind(this);
        // this.toggleSearch = this.toggleSearch.bind(this);
        //
        // console.log(this.props.match.params.id);
        // this.getThreads(this.props.match.params.id);
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
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    update() {
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
        // console.log(this.props.match.params.id);
        // MessageActions.getMessagesInConversation(localStorage.getItem('username'), this.props.match.params.id);
        // setTimeout(function(){}, 3000);
        ThreadActions.getThreadsInConversation(localStorage.getItem('username'), this.props.match.params.id);
        // this.setState({
        //     threads:  JSON.parse(ThreadStore._getThreads()).result,
        //     messages: JSON.parse(MessageStore._getMessages()).result
        // });
        // console.log(JSON.parse(ThreadStore._getThreads()).result);
        // console.log(JSON.parse(MessageStore._getMessages()).result);
        //console.log(ThreadStore._getThreads())
    }

    updateMessages() {

    }

    // sendMessage() {
    //     const message = {
    //         text: this.state.newMessageText,
    //         sender_id: localStorage.getItem('id'),
    //     };
    //
    //     const thread = {
    //         conversation_id: this.state.conversation,
    //         messages: [message]
    //     };
    //
    //     DataService.addThreadToConversation(this.state.conversation, thread);
    //     this.getThreads();
    //     this.setState({
    //         newMessageText: ''
    //     });
    //     window.scrollTo(0, document.body.scrollHeight);
    //
    // }
    //
    // onMessageChange = (event) => {
    //     this.setState({ newMessageText: event.target.value })
    // };
    //
    //
    // getThreads() {
    //     DataService.getThreadsForConversation(this.state.conversation)
    //         .then(response =>
    //             this.setState({
    //             threads: response
    //         }));
    //
    // }
    //

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

    render() {
        if (!(localStorage.getItem('loggedIn') === 'true')) {
            return <Redirect to='/login'/>
        } else
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
                                            searchClick={this.toggleSearch}/>
                    </div>
                    {this.renderSearchBar()}
                    <LoadingMessages  id={this.props.match.params.id}/>
                    <ThreadContainer threads={this.state.threads}
                                     messages={this.state.messages}/>
                    <ConversationFooter/>
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

export default Conversation;