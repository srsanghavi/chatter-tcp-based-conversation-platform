import React from 'react'
import {css} from 'emotion';
import UserActions from "../Actions/UserActions";

const Settings = () => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            padding: '1em'
        })}>
            <button className="btn-outline-primary"
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Log Out</button>
            <button className="btn-outline-danger"
                    onClick={() => {
                        UserActions.deleteUser(localStorage.getItem('username'), localStorage.getItem('id'));
                        // localStorage.clear();
                        // window.location.reload();
                    }}>Delete Account</button>
        </div>
    )
};

export default Settings;