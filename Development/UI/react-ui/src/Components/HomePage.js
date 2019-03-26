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
import SearchBar from './SearchBar';
import Broadcast from './Broadcast'

const tab = {
    // TO-DO : make enum for tab values
};

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'conversations',
            search: false,
            broadcast: false,
            user: null,
            users: null,
            conversations: null
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
        this.conversationTabSelected = this.conversationTabSelected.bind(this);
        this.searchTabSelected = this.searchTabSelected.bind(this);
        this.settingsTabSelected = this.settingsTabSelected.bind(this);
        this.profileTabSelected = this.profileTabSelected.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this)
        this.toggleBroadcast = this.toggleBroadcast.bind(this)

    }

    componentWillMount(){
        UserStore.addChangeListener(this._onChange);
        ConversationStore.addChangeListener(this._onConversationsChanged);
    }


    componentDidMount() {
        this.setState({
            user: JSON.parse(UserStore._getUser()).result[0],
            users: JSON.parse(UserStore._getUsers()).result,
            conversations: JSON.parse(ConversationStore._getConversations()).result
        });
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        UserStore.removeChangeListener(this._onChange);
        ConversationStore.removeChangeListener(this._onConversationsChanged);
    }

    componentDidUpdate() {
        // UserActions.getUsers(this.state.user.username)
        //ConversationActions.getConversations(this.state.user.username, this.state.user.id)
        //console.log(ConversationStore._getConversations())
    }

    _onChange() {
    }

    _onConversationsChanged(){
        var conv = ConversationStore.getConversations();
    }

    conversationTabSelected() {
        this.setState({
            tab: 'conversations',
            search: false,
            broadcast: false
        })
    }

    searchTabSelected() {
        this.setState({
            tab: 'search',
            search: false,
            broadcast: false
        })
    }

    settingsTabSelected() {
        this.setState({
            tab: 'settings',
            search: false,
            broadcast: false
        })
    }

    profileTabSelected() {
        this.setState({
            tab: 'profile',
            search: false,
            broadcast: false
        })
    }


    toggleSearch() {
        this.setState({
            broadcast: this.state.search ? this.state.broadcast : false,
            search: !this.state.search
        })
    }

    toggleBroadcast() {
        this.setState({
            search: this.state.broadcast ? this.state.search : false,
            broadcast: !this.state.broadcast
        })
    }

    renderSearchBar() {
        if(this.state.search) {
            return(
                <div className={css({paddingBottom: '3em'})}>
                    <SearchBar/>
                </div>
            )
        }
    }

    renderBroadcast() {
        if(this.state.broadcast) {
            return(
                <div className={css({paddingBottom: '3em'})}>
                    <Broadcast/>
                </div>
            )
        }
    }


    render() {
        return (
            <div>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <Header tab={this.state.tab}
                            profileOnClick={this.profileTabSelected}
                            search={this.state.search}
                            searchClick={this.toggleSearch}
                            broadcast={this.state.broadcast}
                            broadcastClick={this.toggleBroadcast}/>
                </div>
                {this.renderBroadcast()}
                {this.renderSearchBar()}
                <Switch>
                    <Route path="/profile">
                        {() => <Profile user={this.state.user}/>}
                    </Route>
                    <Route path="/settings">
                        {() => <Settings/>}
                    </Route>
                    <Route path="/conversations">
                        {() => <Conversations conversations={JSON.parse(ConversationStore._getConversations()).result}/>}
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