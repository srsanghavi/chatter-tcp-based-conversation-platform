import React, { Component } from 'react'
import UserActions from "../Actions/UserActions";
import UserStore from "../Store/UserStore";
import {css} from "emotion";

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            private: true
        };

        this.privateChange = this.privateChange.bind(this)
    }

    componentDidMount() {
        console.log(this.state.private)
        //UserActions.getUserByUsername(localStorage.getItem('username'))
        // this.setState({
        //     user: UserStore._getUser()
        // })
    }

    componentDidUpdate() {
        console.log(this.state.private)
    }

    privateChange() {
        this.setState({
            private: !this.state.private
        });
    }

    render() {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
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
                        margin: '0.25em !important'
                    }
                })}>
                    <p>
                        <label>Username:</label>
                        <input type="text"
                               className="input-group-text"/>
                    </p>
                    <p>
                        <label>First Name:</label>
                        <input type="text"
                               className="input-group-text"/>
                    </p>
                    <p>
                        <label>Last Name:</label>
                        <input type="text"
                               className="input-group-text"/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email"
                               className="input-group-text"/>
                    </p>
                    <p>
                        <label>Private:</label>
                        <label className="switch">
                            <input type="checkbox"
                                   checked={this.state.private}
                                   onChange={this.privateChange}/>
                            <span className="slider round"></span>
                        </label>
                    </p>
                </div>

            </div>
        )
    }
};

export default Profile;