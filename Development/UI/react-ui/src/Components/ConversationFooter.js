import React from 'react';
import {css} from 'emotion';

const ConversationFooter = props => {
    return (
        <div className={css({
            display: 'flex',
            flex: '0 0 5em',
            padding: '0 0.75em',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'fixed',
            width: '100%',
            height: '5em',
            bottom: 0,
            color: 'white',
            backgroundColor: '#342E37',
            boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
        })}>
            <input
                type='text'
                placeholder='Send message...'
                value={props.value}
                onChange={props.onChange}
                className={css({
                    height: '1.5em',
                    width: '70%',
                    fontSize: '1.25em'
                })}/>
            <i className='fa fa-paper-plane'
               style={{
                      fontSize: '1.5em',
                      marginLeft: 10,
                      color: 'white'
                  }}
               onClick={props.onClick}/>
        </div>
    );
};

export default ConversationFooter;