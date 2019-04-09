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
            user: {},
            editMode: false
        };
        this._onUserChanged = this._onUserChanged.bind(this);
        this.editOnClick = this.editOnClick.bind(this);
        this.cancelOnClick = this.cancelOnClick.bind(this);
    }

    componentWillMount() {
        UserStore.addChangeListener(this._onUserChanged);
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
            user: user
        })
    }

    _onUserChanged(){
        const user = UserStore._getUser();

        this.setState({
            user: user
        })
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onUserChanged);
        UserStore._clearUser();
    }

    editOnClick() {
        this.setState({
            editMode: true
        })
    }

    cancelOnClick() {
        this.setState({
            user: AuthStore._getAuthUser(),
            editMode: false
        })
    }

    render() {
        if(this.state.user.username === undefined) {
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
                        <img src={this.state.user.profilePicture} alt="" height="75" width="75"
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
                                   value={this.state.user.username}
                                   readOnly/>
                        </p>
                        <p>
                            <label>First Name:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.user.first_name}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Last Name:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.user.last_name}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Email:</label>
                            <input type="email"
                                   className="input-group-text"
                                   value={this.state.user.email}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Language:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={this.state.user.preferredLanguage}
                                   readOnly={!this.state.editMode}
                                   required={this.state.editMode}/>
                        </p>
                        <p>
                            <label>Join Date:</label>
                            <input type="text"
                                   className="input-group-text"
                                   value={moment(this.state.user.created_on).format('MMMM Do, YYYY')}
                                   readOnly/>
                        </p>
                        {this.props.match.params.username === AuthStore._getAuthUser().username ?
                        <p>
                            <label>Private:</label>
                            <label className="switch">
                                <input type="checkbox"
                                       checked={!this.state.user.isSearchable}
                                       onChange={this.privateChange}/>
                                <span className="slider round"></span>
                            </label>
                        </p> : null}
                        {this.state.editMode ?
                        <div>
                            <button className="btn btn-primary"
                                    style={{
                                        width: '35%',
                                        float: 'left',
                                        marginRight: '0.25em'
                                    }}>Save</button>
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
