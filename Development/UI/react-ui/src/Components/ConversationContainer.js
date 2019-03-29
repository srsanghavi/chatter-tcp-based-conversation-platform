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
                        && user.id != localStorage.getItem('id')
                })[0];
                console.log(user)
                return(
                    <ConversationPreview conversation={conversation}
                                         user={user}/>
                )
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