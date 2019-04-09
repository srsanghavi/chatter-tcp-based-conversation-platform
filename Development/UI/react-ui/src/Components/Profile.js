import React, { Component } from 'react'
import {css} from "emotion";
import moment from "moment/moment";
import AuthStore from '../Store/AuthStore';
import UserActions from "../Actions/UserActions";
import UserStore from '../Store/UserStore';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        };
        this._onUserChanged = this._onUserChanged.bind(this);
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

    render() {
        console.log(this.state.user.username);
        if(this.state.user.username === undefined) {
            return null
        }
        return (
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
                               readOnly/>
                    </p>
                    <p>
                        <label>Last Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.user.last_name}
                               readOnly/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email"
                               className="input-group-text"
                               value={this.state.user.email}
                               readOnly/>
                    </p>
                    <p>
                        <label>Language:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.user.preferredLanguage}
                               readOnly/>
                    </p>
                    <p>
                        <label>Join Date:</label>
                        <h6 className={css({
                            width: '65%',
                            textAlign: 'left',
                            fontFamily: 'Titillium Web',
                            fontWeight: 'bold',
                        })}>{moment(this.state.user.created_on).format('MMMM Do YYYY')}
                        </h6>
                    </p>
                    <p>
                        <label>Private:</label>
                        <label className="switch">
                            <input type="checkbox"
                                   checked={!this.state.user.isSearchable}
                                   onChange={this.privateChange}/>
                            <span className="slider round"></span>
                        </label>
                    </p>
                </div>
            </div>
        )

    }
}

export default Profile;
