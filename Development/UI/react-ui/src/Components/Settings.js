import React from 'react'
import {css} from 'emotion';

const Settings = () => {
    return(
        <div className={css({
            padding: '1em'
        })}>
            <button className="btn-outline-primary"
                    onClick={() => {
                        localStorage.clear();
                        window.location.reload();
                    }}>Log Out</button>
        </div>
    )
};

export default Settings;