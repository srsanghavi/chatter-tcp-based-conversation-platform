import React, { Component } from 'react'
import {css} from "emotion";
import UserStore from "../Store/UserStore";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            username: '',
            firstName: '',
            lastName: '',
            email: ''
        }
    }

    componentDidMount() {
        let user = JSON.parse(UserStore._getUsers()).result.filter(user => {
            return user.id === this.props.match.params.id
        });
        this.setState({
            username: user[0].username,
            firstName: user[0].first_name,
            lastName: user[0].last_name,
            email: user[0].email
        })
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
                    <img src="../images/image.png" alt="" height="75" width="75"
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
                               readOnly/>
                    </p>
                    <p>
                        <label>First Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.firstName}
                               readOnly/>
                    </p>
                    <p>
                        <label>Last Name:</label>
                        <input type="text"
                               className="input-group-text"
                               value={this.state.lastName}
                               readOnly/>
                    </p>
                    <p>
                        <label>Email:</label>
                        <input type="email"
                               className="input-group-text"
                               value={this.state.email}
                               readOnly/>
                    </p>
                </div>
            </div>
        )
    }
}

export default Profile;
