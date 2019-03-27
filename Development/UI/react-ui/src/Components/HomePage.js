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
import ProfileEdit from './ProfileEdit';
import Profile from './Profile';
import SearchBar from './SearchBar';
import Broadcast from './Broadcast'

const tab = {
    CONVERSATIONS: 'conversations',
    SETTINGS: 'settings',
    PROFILE: 'profile'
};

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tab: 'conversations',
            previousTab: '',
            searchBar: false,
            search: '',
            broadcastBar: false,
            broadcast: '',
            user: {},
            users: [],
            conversations: []
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
        this.conversationTabSelected = this.conversationTabSelected.bind(this);
        this.searchTabSelected = this.searchTabSelected.bind(this);
        this.settingsTabSelected = this.settingsTabSelected.bind(this);
        this.profileTabSelected = this.profileTabSelected.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleBroadcast = this.toggleBroadcast.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);

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
            previousTab: this.state.tab,
            tab: 'conversations',
            searchBar: false,
            search: '',
            broadcastBar: false
        })
    }

    searchTabSelected() {
        this.setState({
            previousTab: this.state.tab,
            tab: 'search',
            searchBar: false,
            search: '',
            broadcastBar: false
        })
    }

    settingsTabSelected() {
        this.setState({
            previousTab: this.state.tab,
            tab: 'settings',
            searchBar: false,
            search: '',
            broadcastBar: false
        })
    }

    profileTabSelected() {
        this.setState({
            previousTab: this.state.tab,
            tab: 'profile',
            searchBar: false,
            search: '',
            broadcastBar: false
        })
    }


    toggleSearch() {
        this.setState({
            broadcastBar: this.state.searchBar ? this.state.broadcastBar : false,
            searchBar: !this.state.searchBar,
            search: ''
        })
    }

    toggleBroadcast() {
        this.setState({
            searchBar: this.state.broadcastBar ? this.state.searchBar : false,
            broadcastBar: !this.state.broadcastBar,
            broadcast: ''
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

    renderBroadcast() {
        if(this.state.broadcastBar) {
            return(
                <div className={css({paddingBottom: '3em'})}>
                    <Broadcast/>
                </div>
            )
        }
    }


    render() {
        const filteredUsers = this.state.users.filter(user => {
            return (
                user.id != this.state.user.id &&
                user.isSearchable &&
                (user.first_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                user.last_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                user.username.toUpperCase().includes(this.state.search.toUpperCase()))
            )
        });

        return (
            <div>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <Header tab={this.state.tab}
                            previousTab={this.state.previousTab}
                            user={this.state.user}
                            profileOnClick={this.profileTabSelected}
                            searchOnClick={this.searchTabSelected}
                            conversationsOnClick={this.conversationTabSelected}
                            search={this.state.searchBar}
                            searchClick={this.toggleSearch}
                            broadcast={this.state.broadcastBar}
                            broadcastClick={this.toggleBroadcast}/>
                </div>
                {this.renderBroadcast()}
                {this.renderSearchBar()}
                <Switch>
                    <Route path="/profile/:id"
                           component={Profile}>
                    </Route>
                    <Route path="/settings">
                        {() => <Settings/>}
                    </Route>
                    <Route path="/conversations">
                        {() => <Conversations conversations={JSON.parse(ConversationStore._getConversations()).result}/>}
                    </Route>
                    <Route path="/conversations/:id">
                        {() => <Conversation/>}
                    </Route>
                    <Route path="/search">
                        {() => <UserSearch users={filteredUsers}
                                           profileOnClick={this.profileTabSelected}/>}
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