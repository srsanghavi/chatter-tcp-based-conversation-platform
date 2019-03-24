import React, { Component } from 'react';
import {css} from 'emotion';
import Header from './Header'
import Footer from './Footer'
import DataService from "./Data";
import ConversationContainer from "./ConversationContainer";
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import UserActions from '../Actions/UserActions';
import ConversationActions from "../Actions/ConversationActions";
import ConversationStore from "../Store/ConversationStore";

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            conversations: [],
            user: {
                id: localStorage.getItem('id'),
                username: localStorage.getItem('username')
            },
            search: false
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this._onConversationsChanged = this._onConversationsChanged.bind(this);

    }

    componentWillMount(){
        UserStore.addChangeListener(this._onChange);
        ConversationStore.addChangeListener(this._onConversationsChanged);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onChange);
        ConversationStore.removeChangeListener(this._onConversationsChanged);
    }

    // componentDidMount() {
    //     DataService.getConversationsForUser(this.state.user.id)
    //         .then(response => {
    //                 this.setState({ conversations: response })
    //             });
    // }

    componentDidMount() {
        //UserActions.signin('srsanghavi','12345678');
        //let user = UserActions.getUserById(localStorage.getItem('id'))
        //console.log('test')
        //console.log(user)
        //UserActions.signin(this.state.username,this.state.password);
        ConversationActions.getConversations('srsanghavi','1');
    }

    _onChange() {
        console.log('test')
    }

    _onConversationsChanged(){
        var conv = ConversationStore.getConversations();

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