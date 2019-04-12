import React, { Component }  from 'react';
import {css} from 'emotion';
import ConversationPreview from './ConversationPreview'
import GroupConversationPreview from './GroupConversationPreview'

class ConversationContainer extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const conversations = this.props.conversations;
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
            })}>
                {conversations.map(conversation => {
                            if(conversation.isGroup) {
                                return(<GroupConversationPreview conversation={conversation}/>)
                            } else {
                                return(<ConversationPreview conversation={conversation}/>)
                            }
                })}
            </div>
        )
    }
}

export default ConversationContainer;