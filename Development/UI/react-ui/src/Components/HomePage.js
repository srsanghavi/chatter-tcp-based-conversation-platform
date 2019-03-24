import React, { Component } from 'react';
import {css} from 'emotion';
import Header from './Header'
import Footer from './Footer'
import DataService from "./Data";
import ConversationContainer from "./ConversationContainer";

class HomePage extends Component {
    constructor() {
        super();
        this.state = {
            conversations: [],
            user: {
                id: localStorage.getItem('id'),
                username: localStorage.getItem('username')
            },
            search: false
        };

    }

    componentDidMount() {
        DataService.getConversationsForUser(this.state.user.id)
            .then(response => {
                    this.setState({ conversations: response })
                });
    }


    render() {
        return(
            <div>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <Header/>
                </div>
                {this.state.user.id === null ? null :
                    <ConversationContainer conversations={this.state.conversations}
                                           search={this.state.search}/>}
                <div className={css({
                    paddingTop: '5em'
                })}>
                    <Footer/>
                </div>
            </div>
        )
    }

}

export default HomePage;