import React, { Component } from 'react'
import {css} from "emotion";
import UserStore from "../Store/UserStore";
import AuthStore from '../Store/AuthStore';
import UserActions from '../Actions/UserActions';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            profilePicture:'',
            edit:false,
            isSearchable: false,
            userid: -1,
            editProfilePic:false,
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
        let user = AuthStore._getAuthUser();
        UserStore.addChangeListener(this._onProfileUpdated);
        UserActions.getUserByUsername(user.username);
    }

    componentWillUnmount(){
        UserStore.removeChangeListener(this._onProfileUpdated);
    }

    _onProfileUpdated(){
        let user = UserStore._getUser();
        console.log(user);
        
        AuthStore._setUser(user);
        user = user.result[0];
        this.setState({
            username: user.username,
            firstName: user.first_name,
            lastName: user.last_name,
            email: user.email,
            profilePicture: user.profilePicture,
            isSearchable: user.isSearchable,
            userid: user.id,
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
        e.preventDefault();
        this.setState({
            profilePicture:e.target.value,
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
                    <a href="#" onClick={this.onEditProfilePicClick} data-toggle="modal" data-target="#exampleModal">
                        <img src={this.state.profilePicture} alt="" height="75" width="75"
                            className={css({
                                borderRadius: 50
                            })}/>
                    </a>
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
                               
                               readOnly/>
                    </p>
                    <p>
                        <label>First Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.firstName}
                               onChange={this.firstNameChange}
                               />
                    </p>
                    <p>
                        <label>Last Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.lastName}
                               onChange={this.lastNameChange}
                               />
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email"
                               className="input-group-text"
                               value={this.state.email}
                               readOnly/>

                        <label>Is Searchable:</label>
                        <checkbox value={this.state.isSearchable}></checkbox>
                    </p>
                </div>
                {/* <div className={this.state.edit?'hidden':''}>
                    <a href="#" onClick={this._onEdit}>Edit</a>
                </div> */}
                <div className={this.state.edit?'':''}>
                    <a href="#" onClick={this._onSave}>Save</a>
                </div>

                {this.state.editProfilePic===true?this.renderProfileEdit():''}

            </div>
        )
    }
}

export default Profile;
