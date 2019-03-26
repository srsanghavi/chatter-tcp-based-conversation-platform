import React, { Component } from 'react'
import UserActions from "../Actions/UserActions";
import UserStore from "../Store/UserStore";
import {css} from "emotion";

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            firstName: '',
            lastName: '',
            email: '',
            isSearchable: true,
            createdDate: ''
        };

        this.privateChange = this.privateChange.bind(this)
    }

    componentDidMount() {
        this.setState({
            username: this.props.user.username,
            firstName: this.props.user.first_name,
            lastName: this.props.user.last_name,
            email: this.props.user.email,
            isSearchable: this.props.user.isSearchable,
            createdDate: this.props.user.created_on
        });
        console.log(this.props.user)
    }

    componentDidUpdate() {
        console.log(this.state.isSearchable)
    }

    privateChange() {
        this.setState({
            isSearchable: !this.state.isSearchable
        });
    }



    render() {
        return(
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
                    <img src="./images/image.png" height="75" width="75"
                          className={css({
                              borderRadius: 50
                          })}/>
                </div>
                <div className={css({
                    "& label": {
                        width: '35%',
                        float: 'left',
                        fontFamily: 'Titillium Web',
                        fontWeight: 'bold'
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
                        fontWeight: 'bold'
                    },
                    "& p": {
                        margin: '0.3em !important'
                    }
                })}>
                    <p>
                        <label>Username:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.username}/>
                    </p>
                    <p>
                        <label>First Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.firstName}/>
                    </p>
                    <p>
                        <label>Last Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.lastName}/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email"
                               className="input-group-text"
                               value={this.state.email}/>
                    </p>
                    {/*<p>*/}
                        {/*<label>Date Joined:</label>*/}
                        {/*<h6>{this.state.createdDate}</h6>*/}
                    {/*</p>*/}
                    <p>
                        <label>Private:</label>
                        <label className="switch">
                            <input type="checkbox"
                                   checked={!this.state.isSearchable}
                                   onChange={this.privateChange}/>
                            <span className="slider round"></span>
                        </label>
                    </p>
                </div>
            </div>
        )
    }
}

export default ProfileEdit;