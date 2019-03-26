import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ThreadContainer from "./ThreadContainer";
import DataService from "./Data";
import SearchBar from "./SearchBar";
import  { Redirect } from 'react-router-dom'
import ThreadActions from "../Actions/ThreadActions";

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //id: this.props.match.params.id,
            searchBar: false,
            search: '',
            newMessageText: '',
            threads: [],
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

    componentDidMount() {
        console.log(this.props.match.params.id)
        console.log(localStorage.getItem('username'))
        ThreadActions.getThreadsInConversation(localStorage.getItem('username'), this.props.match.params.id)
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
        } else {
            return (
                <div className={css({
                    // display: 'flex',
                    // flexDirection: 'column',
                    // height: '100%',
                    // width: '100%',
                    // overflowX: 'hidden',
                })}>
                    <div className={css({
                        paddingBottom: '5em'
                    })}>
                        <ConversationHeader search={this.state.searchBar}
                                            searchClick={this.toggleSearch}/>
                    </div>
                    {this.renderSearchBar()}
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

}

export default Conversation;