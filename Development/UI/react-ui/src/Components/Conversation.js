import React, { Component } from 'react';
import {css} from 'emotion';
import ConversationHeader from "./ConversationHeader";
import ConversationFooter from "./ConversationFooter";
import ThreadContainer from "./ThreadContainer";
import DataService from "./Data";
import SearchBar from "./SearchBar";

class Conversation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversation: this.props.match.params.id,
            newMessageText: '',
            threads: [],
            search: false
        };
        this.sendMessage = this.sendMessage.bind(this);
        this.onMessageChange = this.onMessageChange.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);

        console.log(this.props.match.params.id);
        this.getThreads(this.props.match.params.id);
    }

    sendMessage() {
        const message = {
            text: this.state.newMessageText,
            sender_id: localStorage.getItem('id'),
        };

        const thread = {
            conversation_id: this.state.conversation,
            messages: [message]
        };

        DataService.addThreadToConversation(this.state.conversation, thread);
        this.getThreads();
        this.setState({
            newMessageText: ''
        });
        window.scrollTo(0, document.body.scrollHeight);

    }

    onMessageChange = (event) => {
        this.setState({ newMessageText: event.target.value })
    };


    getThreads() {
        DataService.getThreadsForConversation(this.state.conversation)
            .then(response =>
                this.setState({
                threads: response
            }));

    }

    toggleSearch() {
        this.setState({
            search: !this.state.search
        })
    }

    renderSearchBar() {
        if(this.state.search) {
            return(
                <div className={css({paddingTop: '5em'})}><SearchBar/></div>
            )
        }
    }

    render() {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                height: '100%',
                width: '100%',
                overflowX: 'hidden'
            })}>
                <ConversationHeader search={this.state.search}
                                    searchClick={this.toggleSearch}/>
                {this.renderSearchBar()}
                <ThreadContainer threads={this.state.threads}/>
                <div className={css({paddingBottom: '5em'})}></div>
                <ConversationFooter onChange={this.onMessageChange}
                                    onClick={this.sendMessage}
                                    value={this.state.newMessageText}/>
            </div>
        );
    }

}

export default Conversation