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
import Conversation from "./Conversation";
import {Route, Switch, BrowserRouter} from 'react-router-dom';
import Settings from './Settings';
import Conversations from './Conversations';
import UserSearch from './UserSearch';
import Profile from './Profile';

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'conversations'
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
        this.conversationTabSelected = this.conversationTabSelected.bind(this);
        this.searchTabSelected = this.searchTabSelected.bind(this);
        this.settingsTabSelected = this.settingsTabSelected.bind(this);
        this.profileTabSelected = this.profileTabSelected.bind(this);

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
        //ConversationActions.getConversations('srsanghavi','1');
        console.log(localStorage.getItem('username'));
        console.log(UserStore._getUser())
    }

    _onChange() {
        console.log('test')
    }

    _onConversationsChanged(){
        var conv = ConversationStore.getConversations();
    }

    conversationTabSelected() {
        this.setState({
            tab: 'conversations'
        })
    }

    searchTabSelected() {
        this.setState({
            tab: 'search'
        })
    }

    settingsTabSelected() {
        this.setState({
            tab: 'settings'
        })
    }

    profileTabSelected() {
        this.setState({
            tab: 'profile'
        })
    }



    render() {
        return(
            <div>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <Header tab={this.state.tab}
                            profileOnClick={this.profileTabSelected}/>
                </div>
                    <Switch>
                        <Route path="/profile">
                            {() => <Profile/>}
                        </Route>
                        <Route path="/settings">
                            {() => <Settings/>}
                        </Route>
                        <Route path="/conversations">
                            {() => <Conversations/>}
                        </Route>
                        <Route path="/search">
                            {() => <UserSearch/>}
                        </Route>
                    </Switch>
                <div className={css({
                    paddingTop: '5em'
                })}>
                    <Footer tab={this.state.tab}
                            conversationsOnClick={this.conversationTabSelected}
                            searchOnClick={this.searchTabSelected}
                            settingsOnClick={this.settingsTabSelected}/>
                </div>
            </div>
        )
    }

}

export default HomePage;