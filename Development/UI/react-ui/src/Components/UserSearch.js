import React from 'react'
import {css} from 'emotion';
import UserPreviews from './UserPreviews'

const UserSearch = props => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflowX: 'hidden',
        })}>
            {props.users.map(user => {
                return(
                    <UserPreviews user={user}/>
                )
            })}
        </div>
    )
};

export default UserSearch;