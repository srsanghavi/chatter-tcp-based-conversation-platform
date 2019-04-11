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
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.isSearchableChange = this.isSearchableChange.bind(this);
        this.createConversation = this.createConversation.bind(this);
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onUserChanged);
        AuthStore.addChangeListener(this._onAuthChanged);
        if(this.props.match.params.username !== AuthStore._getAuthUser().username) {
            UserActions.getUserByUsername(AuthStore._getAuthUser().username, this.props.match.params.username)
        }

        this._onEdit = this._onEdit.bind(this);
        this._onSave = this._onSave.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this._onProfileUpdated = this._onProfileUpdated.bind(this);

        this.onEditProfilePicClick = this.onEditProfilePicClick.bind(this);
        this.onSaveProfilePicClick = this.onSaveProfilePicClick.bind(this);
        this.onCancelProfilePicClick = this.onCancelProfilePicClick.bind(this);

        this.onProfilePicChange = this.onProfilePicChange.bind(this);

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

    handleSubmit() {
        UserActions.modifyUser(AuthStore._getAuthUser().username, this.state.first_name,
            this.state.last_name, this.state.isSearchable)
    }

    createConversation() {
        ConversationActions.createUserUserConversation(AuthStore._getAuthUser().username,
            AuthStore._getAuthUser().id, this.state.id)
    }


    firstNameChange(event) {
        this.setState({
            first_name: event.target.value
        })
    }

    lastNameChange(event) {
        this.setState({
            last_name: event.target.value
        })
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
            edit:false
        })
        console.log(this.state);
        
        UserActions.updateUser(this.state.username,
                                this.state.userid,
                                this.state.firstName,
                                this.state.lastName,
                                this.state.isSearchable,
                                this.state.profilePicture);
    }

    firstNameChange(e){
        this.setState({
            firstName:e.target.value,
        })
    }

    lastNameChange(e){
        this.setState({
            lastName:e.target.value,
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

    onProfilePicChange(e){
        // e.preventDefault();
        this.setState({
            profilePicture:e,
        })
    }
    renderProfileEdit(){
       
        return(

            <div class="" id="exampleModal"  role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Upload picture</h5>
                        
                    </div>
                    <div class="modal-body">
                        <input type="text" value={this.state.profilePicture} onChange={this.onProfilePicChange}></input>
                    </div>
                    <div class="modal-footer">
                        <button type="button" className="btn btn-primary" onClick={this.onSaveProfilePicClick}>Save</button>
                        <button type="button" className="btn btn-secondary" onClick={this.onCancelProfilePicClick} data-dismiss="modal">Close</button>
                    </div>
                    </div>
                </div>
            </div>
        )
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
                        <img src={this.state.profilePicture} alt="" height="75" width="75"
                             className={css({
                                 borderRadius: 50
                             })}/>
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
                                        style={{
                                            width: '65%',
                                            backgroundColor: 'white',
                                            textAlign: 'left',
                                            fontFamily: 'Titillium Web',
                                            fontWeight: 'bold',
                                        }}>
                                    {data.LANGUAGES.map(language => {
                                        return <option value={language}>{language}</option>
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
                                    onClick={this.handleSubmit}>Save</button>
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
                {/* <div className={this.state.edit?'hidden':''}>
                    <a href="#" onClick={this._onEdit}>Edit</a>
                </div> */}
                <div className={this.state.edit?'':''}>
                    <a href="#" onClick={this._onSave}>Save</a>
                </div>


            </div>
        )

    }
}

export default Profile;
