import React from 'react';
import {css} from 'emotion';
import ConversationPreviewOld from './ConversationPreviewOld'


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
                    <ConversationPreviewOld conversation={conversation}/>
                )
            })}
        </div>
    )
};

export default ConversationContainer;