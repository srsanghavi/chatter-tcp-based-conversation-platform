import React from 'react';
import {css} from 'emotion';
import Thread from "./Thread";

const ThreadContainer = props => {
    if(props.threads == null) {
        return null
    } else {
        return (
            <div className={css({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                height: '100%',
                overflowX: 'hidden',
                paddingBottom: '5em',
            })}>
                <div className={css({paddingTop: '5em'})}></div>
                {props.threads.map(thread => {
                    return (
                        <Thread thread={thread}/>
                    )
                })}
            </div>
        )
    }
};

export default ThreadContainer;