import React from 'react';
import {css} from 'emotion';
const Thread = props => {

    // if(props.thread.messages[0].sender_id == localStorage.getItem('id')) {
    //     return(
    //         <div className={css({
    //             display: 'flex',
    //             flexDirection: 'row',
    //             justifyContent: 'flex-end',
    //             margin: '0.5em',
    //             fontSize: '1em',
    //             backgroundColor: 'white',
    //         })}>
    //             <p className={css({
    //                 //alignSelf: 'center',
    //                 padding: '0.2em',
    //                 fontWeight: 'bold',
    //                 color: '#124e78'
    //             })}>
    //                 </p>
    //             <p className={css({
    //                 padding: '0.5em',
    //                 borderRadius: '0.25em',
    //                 border: '1px solid #342E37',
    //                 wordWrap: 'break-word',
    //                 maxWidth: '45%',
    //                 backgroundColor: '#CEDAE5'
    //             })}>
    //                 {props.thread.messages[0].text}
    //             </p>
    //         </div>
    //     )
    // } else {
    //     return (
    //         <div className={css({
    //             display: 'flex',
    //             flexDirection: 'row',
    //             justifyContent: 'flex-start',
    //             margin: '0.5em',
    //             fontSize: '1em',
    //             backgroundColor: 'white',
    //         })}>
    //             <p className={css({
    //                 padding: '0.5em',
    //                 borderRadius: '0.25em',
    //                 border: '1px solid #342E37',
    //                 wordWrap: 'break-word',
    //                 maxWidth: '45%'
    //             })}>
    //                 {props.thread.messages[0].text}
    //             </p>
    //             <p className={css({
    //                 //alignSelf: 'center',
    //                 padding: '0.2em',
    //                 fontWeight: 'bold',
    //                 color: '#124e78'
    //             })}>
    //                 {props.thread.messages.length > 1 ? '[' + props.thread.messages.length + ']' : null}
    //             </p>
    //         </div>
    //     )
    // }

    if(props.threadMessages.length === 0) {
        return null
    } else {
        return(
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                margin: '0.5em',
                fontSize: '1em',
                backgroundColor: 'white',
            })}>
                <p className={css({
                    //alignSelf: 'center',
                    padding: '0.2em',
                    fontWeight: 'bold',
                    color: '#124e78'
                })}>
                </p>
                <p className={css({
                    padding: '0.5em',
                    borderRadius: '0.25em',
                    border: '1px solid #342E37',
                    wordWrap: 'break-word',
                    maxWidth: '45%',
                    backgroundColor: props.threadMessages.length > 1 ? '#CEDAE5' : 'white'
                })}>
                    {props.threadMessages[0].text}
                </p>
            </div>
        )
    }
};

export default Thread;