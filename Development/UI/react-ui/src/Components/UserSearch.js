import React from 'react'
import {css} from 'emotion';
import UserPreviews from './UserPreviews'
import GroupPreviews from "./GroupPreviews";

const UserSearch = props => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflowX: 'hidden',
        })}>
            {props.userButtonSelected ?
                props.users.map(user => {
                    return( <UserPreviews user={user}
                                          profileOnClick={props.profileOnClick}/>)
                }) :
                props.groups.map(group => {
                    return( <GroupPreviews group={group}/>)
                })
            }
        </div>
    )
};

export default UserSearch;