import React, { Component } from 'react';
import {css} from 'emotion';
import Header from './Header'
import Footer from './Footer'
import Api from '../Services/Api';
import UserStore from '../Store/UserStore';
import ConversationStore from "../Store/ConversationStore";
import Conversation from "./Conversation";
import {Route, Switch, Redirect} from 'react-router-dom';
import Settings from './Settings';
import ConversationContainer from './ConversationContainer';
import UserSearch from './UserSearch';
import ProfileEdit from './ProfileEdit';
import Profile from './Profile';
import SearchBar from './SearchBar';
import Broadcast from './Broadcast'
import GroupStore from "../Store/GroupStore";
import MessageActions from "../Actions/MessageActions";
import ConversationActions from '../Actions/ConversationActions';
import UserActions from '../Actions/UserActions';
import GroupActions from '../Actions/GroupActions';
import SearchUsers from './SearchUsers';
import SearchGroups from './SearchGroups'

import AuthStore from '../Store/AuthStore';


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
            myGroups: [],
            groups: [],
            conversations: [],
        };

        this.api = new Api();
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
        this._onGroupConversationsChanged = this._onGroupConversationsChanged.bind(this);
        this.conversationTabSelected = this.conversationTabSelected.bind(this);
        this.searchTabSelected = this.searchTabSelected.bind(this);
        this.settingsTabSelected = this.settingsTabSelected.bind(this);
        this.profileTabSelected = this.profileTabSelected.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.toggleBroadcast = this.toggleBroadcast.bind(this);
        this.onSearchChange = this.onSearchChange.bind(this);
        this.onBroadcastChange = this.onBroadcastChange.bind(this);
        this.sendBroadcast = this.sendBroadcast.bind(this);

    }

    componentWillMount(){
        console.log(AuthStore._getAuthUser());
        ConversationStore.addChangeListener(this._onConversationsChanged);
        GroupStore.addGroupsChageListner(this._onGroupConversationsChanged);
    }


    componentDidMount() {
        const user = AuthStore._getAuthUser();
        this.setState({
            user: user,
            conversations: ConversationStore._getConversations().concat(GroupStore._getGroups()),
        });
        const PATH = window.location.pathname.split('/');
        if(PATH[PATH.length - 1] === 'conversations') {
            ConversationActions.getConversations(user.username, user.id);
        }
        
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        ConversationStore.removeChangeListener(this._onConversationsChanged);
        GroupStore.removeGroupsListener(this._onGroupConversationsChanged);
    }
    
    _onChange() {
    }

    _onConversationsChanged(){
        const conversations = ConversationStore._getConversations();
        this.setState({
            conversations: conversations,
        });
        GroupActions.getGroupConversations(AuthStore._getAuthUser().username,AuthStore._getAuthUser().id);
        
    }

    _onGroupConversationsChanged(){
        var convs = GroupStore._getGroups();
        convs = convs.map(c => {
            return {
            created_on:c.created_on,
            destination_firstname:c.name,
            destination_id:-1,
            destination_lastname:"",
            destination_username:"",
            id:c.conversation_id,
        }})
             this.setState({
                 conversations:this.state.conversations.concat(convs),
             })
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

    onBroadcastChange(event) {
        this.setState({broadcast: event.target.value});
    }

    sendBroadcast() {
        MessageActions.broadcastMessage(localStorage.getItem('username'), localStorage.getItem('id'),
        "\"" + this.state.broadcast + "\"");
        this.setState({
            broadcast: ''
        })
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
                    <Broadcast onChange={this.onBroadcastChange}
                               onClick={this.sendBroadcast}
                               value={this.state.broadcast}/>
                </div>
            )
        }
    }


    render() {
        const filteredUsers = this.state.users.filter(user => {
            return (
                user.id !== this.state.user.id &&
                user.isSearchable &&
                !user.deleted &&
                (user.first_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                user.last_name.toUpperCase().includes(this.state.search.toUpperCase()) ||
                user.username.toUpperCase().includes(this.state.search.toUpperCase()))
            )
        });

        const filteredGroups = this.state.groups.filter(group => {
            return (
                group.isSearchable && group.name.toUpperCase().includes(this.state.search.toUpperCase())
            )
        });

        const filteredMyGroups = this.state.myGroups.filter(group => {
            return (
                group.isSearchable &&
                group.name.toUpperCase().includes(this.state.search.toUpperCase())
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
                    <Route path="/edit-profile/:id"
                           component={ProfileEdit}>
                    </Route>


                    <Route path="/settings">
                        {() => <Settings/>}
                    </Route>
                    <Route path="/conv-redirect">
                        {() => <Redirect to={'./conversations'}/>}
                    </Route>
                    <Route path="/conversations">
                        {() => <ConversationContainer conversations={this.state.conversations}
                                                      myGroups={filteredMyGroups}
                                                      users={this.state.users}
                                                      search={this.state.search}/>}
                    </Route>
                    <Route path="/conversations/:id">
                        {() => <Conversation/>}
                    </Route>
                    <Route path="/search">
                        {() => <UserSearch users={filteredUsers}
                                           groups={filteredGroups}
                                           userButtonSelected={this.state.userButtonSelected}
                                           profileOnClick={this.profileTabSelected}/>}
                    </Route>
                    <Route path="/search-users">
                        {() => <SearchUsers search={this.state.search}/>}
                    </Route>
                    <Route path="/search-groups">
                        {() => <SearchGroups search={this.state.search}/>}
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