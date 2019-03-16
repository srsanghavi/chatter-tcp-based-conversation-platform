import React from 'react';
import {css} from 'emotion';
import ConversationPreview from './ConversationPreview'


const ConversationContainer = props => {
    return(
        <div className={css({
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%',
            overflowX: 'hidden',
            paddingBottom: '5em',
        })}>
            {props.conversations.map(conversation => {
                return(
                    <ConversationPreview conversation={conversation}/>
                )
            })}
        </div>
    )
};

export default ConversationContainer;