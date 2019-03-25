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
            tab: 'conversations',
            user: null
        };

        this.api = new Api();
        this._onChange = this._onChange.bind(this);
        this._onConversationsChanged = this._onConversationsChanged.bind(this);
        this.conversationTabSelected = this.conversationTabSelected.bind(this);
        this.searchTabSelected = this.searchTabSelected.bind(this);
        this.settingsTabSelected = this.settingsTabSelected.bind(this);
        this.profileTabSelected = this.profileTabSelected.bind(this);
        this.test = this.test.bind(this)

    }

    componentWillMount(){
        UserStore.addChangeListener(this._onChange);
        ConversationStore.addChangeListener(this._onConversationsChanged);
    }


    componentDidMount() {
        // UserStore._clearUser();
        // UserActions.getUserByUsername(localStorage.getItem('username'));
        // ConversationActions.getConversations(localStorage.getItem('username'), '1');
        // this.interval = setInterval(() => this.loadUser(), 500);
        this.setState({
            user: UserStore._getUser()
        })
    }

    componentWillUnmount() {
        clearInterval(this.interval);
        UserStore.removeChangeListener(this._onChange);
        ConversationStore.removeChangeListener(this._onConversationsChanged);
    }

    loadUser() {
        if(UserStore._getUser() !== null) {
            this.setState({
                user: UserStore._getUser()
            });
            clearInterval(this.interval);
        }
    }

    componentDidUpdate() {
        console.log(this.state.user[0].username)
    }

    _onChange() {
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

    test() {
        console.log(this.state.user)
        console.log(this.state.user[0])
    }


    render() {
        // if (this.state.user === null) {
        //     return (
        //         <div className={css({
        //             textAlign: 'center',
        //             paddingTop: '7em'
        //         })}>
        //             <h4 className={css({
        //                 fontFamily: 'Titillium Web',
        //                 fontWeight: 'bold'
        //             })}>
        //                 Loading...
        //             </h4>
        //         </div>
        //     )
        // } else {
            return (
                <div>
                    <div className={css({
                        paddingBottom: '5em'
                    })}>
                        <Header tab={this.state.tab}
                                profileOnClick={this.profileTabSelected}
                                test={this.test}/>
                    </div>
                    <Switch>
                        <Route path="/profile">
                            {() => <Profile user={this.state.user}/>}
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