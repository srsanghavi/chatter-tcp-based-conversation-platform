import React, { Component } from 'react'
import {css} from "emotion";
import moment from "moment/moment";
import AuthStore from '../Store/AuthStore';
import UserActions from "../Actions/UserActions";
import UserStore from '../Store/UserStore';
import ProfileHeader from "./ProfileHeader";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            profilePicture: '',
            username: '',
            first_name: '',
            last_name: '',
            email: '',
            created_on: '',
            preferredLanguage: '',
            isSearchable: 'true',
            editMode: false
        };
        this._onUserChanged = this._onUserChanged.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.cancelOnClick = this.cancelOnClick.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.firstNameChange = this.firstNameChange.bind(this);
        this.lastNameChange = this.lastNameChange.bind(this);
        this.isSearchableChange = this.isSearchableChange.bind(this);
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

    _onUserChanged(){
        const user = UserStore._getUser();
        this.setState({
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

    _onAuthChanged(){
        const user = AuthStore._getAuthUser();
        this.setState({
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
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.preferredLanguage}
                                   readOnly={!this.state.editMode}
                                   style={this.state.editMode ?
                                       {backgroundColor: 'lightgray', fontStyle: 'italic'} : {}}/>
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
                                       readOnly={!this.state.editMode}/>
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
                </div>
            </div>
        )

    }
}

export default Profile;
