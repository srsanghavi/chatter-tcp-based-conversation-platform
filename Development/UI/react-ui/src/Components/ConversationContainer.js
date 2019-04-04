import React from 'react';
import {css} from 'emotion';
import ConversationPreview from './ConversationPreview'
import GroupConversationPreview from './GroupConversationPreview'

const ConversationContainer = props => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflowX: 'hidden',
        })}>
            {props.conversations.map(conversation => {
                let user = props.users.filter(user => {
                    return (user.id === conversation.Users_id || user.id === conversation.Users_id1)
                        && user.id !== localStorage.getItem('id')
                        && (user.first_name.toUpperCase().includes(props.search.toUpperCase()) ||
                            user.last_name.toUpperCase().includes(props.search.toUpperCase()) ||
                            user.username.toUpperCase().includes(props.search.toUpperCase()))
                });
                if(user.length === 0) {
                    return null
                } else {
                    return (
                        <ConversationPreview conversation={conversation}
                                             user={user[0]}/>
                    )
                }
            })}
            {props.myGroups.map(group => {
                return(
                    <GroupConversationPreview conversation={group}/>
                )
            })}
        </div>
    )
};

export default ConversationContainer;