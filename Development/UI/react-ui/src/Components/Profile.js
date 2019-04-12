import React, { Component } from 'react'
import {css} from "emotion";
import moment from "moment/moment";
import AuthStore from '../Store/AuthStore';
import Mediauploader from './Mediauploader';
import UserActions from "../Actions/UserActions";
import UserStore from '../Store/UserStore';
import ProfileHeader from "./ProfileHeader";
import ConversationStore from "../Store/ConversationStore";
import { NavLink } from 'react-router-dom';
import ConversationActions from "../Actions/ConversationActions";
import data from '../AppConstants';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            profilePicture: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            created_on: '',
            preferredLanguage: '',
            isSearchable: 'true',
            editMode: false,
            conversation: [],
        };
        this._onUserChanged = this._onUserChanged.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.cancelOnClick = this.cancelOnClick.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.isSearchableChange = this.isSearchableChange.bind(this);
        this.createConversation = this.createConversation.bind(this);
        this.onLanguageChange = this.onLanguageChange.bind(this);
        this._onAuthChanged = this._onAuthChanged.bind(this);
        this._onEdit = this._onEdit.bind(this);
        this._onSave = this._onSave.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.onEditProfilePicClick = this.onEditProfilePicClick.bind(this);
        this.onSaveProfilePicClick = this.onSaveProfilePicClick.bind(this);
        this.onCancelProfilePicClick = this.onCancelProfilePicClick.bind(this);
        this.onProfilePicChange = this.onProfilePicChange.bind(this);
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onUserChanged);
        AuthStore.addChangeListener(this._onAuthChanged);
        if(this.props.match.params.username !== AuthStore._getAuthUser().username) {
            UserActions.getUserByUsername(AuthStore._getAuthUser().username, this.props.match.params.username)
        }
    }

  
    componentDidMount() {
        let user;
        if(this.props.match.params.username === AuthStore._getAuthUser().username) {
            user = AuthStore._getAuthUser();
        } else {
            user = UserStore._getUser();
        }
        this.setState({
            id: user.id,
            profilePicture: user.profilePicture,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_on: user.created_on,
            preferredLanguage: user.preferredLanguage,
            isSearchable: user.isSearchable,
        });
    }

    _onUserChanged() {
        const user = UserStore._getUser();
        const conversation = ConversationStore._getConversations().filter(conv => {
            return conv.destination_username === user.username
        });
        this.setState({
            id: user.id,
            profilePicture: user.profilePicture,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_on: user.created_on,
            preferredLanguage: user.preferredLanguage,
            isSearchable: user.isSearchable,
            conversation: conversation
        });
    }

    _onAuthChanged(){
        const user = AuthStore._getAuthUser();
        this.setState({
            id: user.id,
            profilePicture: user.profilePicture,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_on: user.created_on,
            preferredLanguage: user.preferredLanguage,
            isSearchable: user.isSearchable,
            editMode: false
        })
    }


    componentWillUnmount(){
        UserStore.removeChangeListener(this._onUserChanged);
        AuthStore.removeChangeListener(this._onAuthChanged);
        UserStore._clearUser();
    }

    editOnClick() {
        this.setState({
            editMode: true
        })
    }

    cancelOnClick() {
        const user = AuthStore._getAuthUser();
        this.setState({
            id: user.id,
            profilePicture: user.profilePicture,
            username: user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            created_on: user.created_on,
            preferredLanguage: user.preferredLanguage,
            isSearchable: user.isSearchable,
            editMode: false
        })
    }

    createConversation() {
        ConversationActions.createUserUserConversation(AuthStore._getAuthUser().username,
            AuthStore._getAuthUser().id, this.state.id)
    }

    isSearchableChange() {
        this.setState({
            isSearchable: !this.state.isSearchable
        })
    }
    _onEdit(e){
        console.log("hi");
        e.preventDefault();
        this.setState({
            edit:true,
        });
    }

    _onSave(e){
        e.preventDefault();
        this.setState({
            editMode: false
        });
        UserActions.updateUser(this.state.username,
                                this.state.id,
                                this.state.first_name,
                                this.state.last_name,
                                this.state.isSearchable,
                                this.state.profilePicture,
                                this.state.preferredLanguage);
    }

    firstNameChange(e){
        this.setState({
            first_name:e.target.value,
        })
    }

    lastNameChange(e){
        this.setState({
            last_name:e.target.value,
        })
    }

    onLanguageChange(e) {
        this.setState({
            preferredLanguage: e.target.value
        })
    }

    onEditProfilePicClick(){
        this.setState({
            editProfilePic:true,
        })
    }

    onSaveProfilePicClick(){
        this.setState({
            editProfilePic:false,
        })
    }

    onCancelProfilePicClick(){
        this.setState({
            editProfilePic:false,
        })
    }

    onProfilePicChange(e) {
        this.setState({
            profilePicture:e,
        })
    }

    render() {
        if(this.state.username === undefined) {
            return (
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <ProfileHeader username={this.props.match.params.username}/>
                </div>
            )
        }
        return (
            <div>
                <div className={css({
                    paddingBottom: '5em'
                })}>
                    <ProfileHeader username={this.props.match.params.username}
                                   editMode={this.state.editMode}
                                   editOnClick={this.editOnClick}/>
                </div>
                <div className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    paddingTop: '1em',
                    paddingBottom: '1em',
                })}>
                    <div className={css({
                        padding: '1em',
                        alignSelf: 'center'
                    })}>
                        <Mediauploader
                           icon = {(<img src={this.state.profilePicture} alt="" height="75" width="75"
                             className={css({
                                 borderRadius: 50
                             })}/>)}
                            onSave ={this.onProfilePicChange}
                            />
                    </div>
                    <div className={css({
                        "& label": {
                            width: '35%',
                            float: 'left',
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                        },
                        "& label.switch": {
                            float: 'none',
                            width: '23%'
                        },
                        "& input": {
                            width: '65%',
                            backgroundColor: 'white',
                            textAlign: 'left',
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                        },
                        "& p": {
                            margin: '0.3em !important',
                        }
                    })}>
                        <p>
                            <label>Username:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.username}
                                   readOnly
                                   style={this.state.editMode ?
                                       {backgroundColor: 'lightgray', fontStyle: 'italic'} : {}}/>
                        </p>
                        <p>
                            <label>First Name:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.first_name}
                                   onChange={this.firstNameChange}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Last Name:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.last_name}
                                   onChange={this.lastNameChange}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Email:</label>
                            <input type="email"
                                   className="input-group-text"
                                   value={this.state.email}
                                   readOnly={!this.state.editMode}
                                   style={this.state.editMode ?
                                       {backgroundColor: 'lightgray', fontStyle: 'italic'} : {}}/>
                        </p>
                        <p>
                            <label>Language:</label>
                            {this.state.editMode ?
                                <select className="custom-select"
                                onChange={this.onLanguageChange}
                                        style={{
                                            width: '65%',
                                            backgroundColor: 'white',
                                            textAlign: 'left',
                                            fontFamily: 'Titillium Web',
                                            fontWeight: 'bold',
                                        }}>
                                    {data.LANGUAGES.map(language => {
                                        return <option value={language}>{language} </option>
                                    })}
                                </select> :
                                <input type="text"
                                       className="input-group-text"
                                       value={this.state.preferredLanguage}
                                       readOnly/>}
                        </p>
                        <p>
                            <label>Join Date:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={moment(this.state.created_on).format('MMMM Do, YYYY')}
                                   readOnly
                                   style={this.state.editMode ?
                                       {backgroundColor: 'lightgray', fontStyle: 'italic'} : {}}/>
                        </p>
                        {this.props.match.params.username === AuthStore._getAuthUser().username ?
                        <p>
                            <label>Private:</label>
                            <label className="switch">
                                <input type="checkbox"
                                       checked={!this.state.isSearchable}
                                       onChange={this.isSearchableChange}
                                       disabled={!this.state.editMode}/>
                                <span className="slider round"></span>
                            </label>
                        </p> : null}
                        {this.state.editMode ?
                        <div>
                            <button className="btn btn-primary"
                                    type="reset"
                                    style={{
                                        width: '35%',
                                        float: 'left',
                                        marginRight: '0.25em'
                                    }}
                                    onClick={this._onSave}>Save</button>
                            <button className="btn btn-danger"
                                    style={{
                                        width: '35%',
                                        float: 'left',
                                        marginLeft: '0.25em'
                                    }}
                                    onClick={this.cancelOnClick}>Cancel</button>
                        </div> : null}
                    </div>
                    {this.props.match.params.username !== AuthStore._getAuthUser().username ?
                        <div className={css({
                            padding: '1em'
                        })}>
                            {this.state.conversation.length > 0 ?
                                <NavLink to={`../conversations/${this.state.conversation[0].id}`}>
                                    <button className="btn btn-primary"
                                            onClick={this.sendMessage}>
                                        Send Message
                                    </button>
                                </NavLink> :
                                <button className="btn btn-primary"
                                        onClick={this.createConversation}>
                                    Send Message
                                </button>}
                        </div> : null}
                </div>

            </div>
        )

    }
}

export default Profile;