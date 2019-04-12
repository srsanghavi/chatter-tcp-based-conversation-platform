import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';
import AuthStore from '../Store/AuthStore';
import Emojify from 'react-emojione';

const isImage = require('is-image');
var isVideo = require('is-video');




const ThreadPreview = props => {
    let videoPrev;
    if(props.threadMessages[0].mediaURL && 
        props.threadMessages[0].mediaURL!=="" 
        && isVideo(props.threadMessages[0].mediaURL)){
            videoPrev = (<video width="200"  controls > 
                            <source src={props.threadMessages[0].mediaURL} type="video/mp4" />
                            <source src="movie.ogg" type="video/ogg" />
                        Your browser does not support the video tag.
                        </video>)
            console.log("yes "+ props.threadMessages[0].mediaURL);
        }
    if(props.threadMessages.length === 0) {
        return null
    } else {
        return(
            <div className={css({
                width: '100%',
                textAlign: 'center'
            })}>
                <p className={css({
                    opacity: '0.75',
                    fontSize: '0.75em',
                    padding: '0.5em'
                })}>{props.displayDate}</p>
                    <div className={css({
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: props.threadMessages[0].sender_id === AuthStore._getAuthUser().id ?
                                        'flex-end' : 'flex-start',
                        margin: '0.5em',
                        textAlign: 'left',
                        fontSize: '1em',
                        backgroundColor: 'white',
                    })}>
                        <NavLink to={`${props.conversationId}/thread/${props.threadMessages[0].thread_id}`}
                                 className={css({
                            padding: '0.5em',
                            borderRadius: '0.25em',
                            border: '1px solid black',
                            wordWrap: 'break-word',
                            maxWidth: '45%',
                            backgroundColor: props.threadMessages.length > 1 ? '#edd0b7' : 'white',
                            color: 'black',
                            textDecoration: 'none'
                        })}>
                            <h6 className={css({
                                fontSize: '0.9em',
                                borderBottom: '1px solid gray'
                            })}>{props.threadMessages[0].first_name}</h6>
                            <img src={props.threadMessages[0].mediaURL && props.threadMessages[0].mediaURL!=="" 
                                        && isImage(props.threadMessages[0].mediaURL)?props.threadMessages[0].mediaURL:""} width="200" />
                            
                            {videoPrev}
                            
                            <Emojify style={{height: 32, width: 32}} onClick={e => alert(e.target.title)}>
                                <span>{props.threadMessages[0].text}</span>
                            </Emojify>
                            

                            <div className = {css({
                                visibility: props.threadMessages.length<=1? "hidden" : "visible",
                                color: '#666',
                                textDecorationStyle: 'wavy',

                            })}>
                                {props.threadMessages.length < 2 ? null :
                                <small>{props.threadMessages.length-1} replies</small>}
                            </div>
                        </NavLink>
                        
                    </div>
                   
            </div>
        )
    }
};

export default ThreadPreview;