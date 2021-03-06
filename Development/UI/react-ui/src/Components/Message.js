import React, {Component} from 'react';
import {css} from 'emotion';
import AuthStore from '../Store/AuthStore';
import Emojify from 'react-emojione';
const isImage = require('is-image');
var isVideo = require('is-video');


class Message extends Component {

    render(){
        let props = this.props;
        let videoPrev;
        if(props.message.mediaURL && 
            props.message.mediaURL!=="" 
            && isVideo(props.message.mediaURL)){
                videoPrev = (<video width="100%"  controls >
                                <source src={props.message.mediaURL} type="video/mp4" />
                                <source src="movie.ogg" type="video/ogg" />
                            Your browser does not support the video tag.
                            </video>)
            }
    return(
        <div className={css({
            width: '100%',
            textAlign: 'center'
        })}>
            <p className={css({
                opacity: '0.5',
                fontSize: '0.75em',
                padding: '0.2em'
            })}>{props.message.displayDate}</p>
            <div className={css({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: props.message.sender_id.toString() == AuthStore._getAuthUser().id ?
                                'flex-end' : 'flex-start',
                margin: '0.5em',
                textAlign: 'left',
                fontSize: '1em',
                backgroundColor: 'white',
            })}>
                <p className={css({
                    padding: '0.5em',
                    borderRadius: '0.25em',
                    border: '1px solid black',
                    wordWrap: 'break-word',
                    maxWidth: '45%',
                    color: 'black',
                    textDecoration: 'none'
                })}>
                    <h6 className={css({
                        fontSize: '0.9em',
                        borderBottom: '1px solid gray'
                    })}>{props.message.first_name}</h6>
                 <img src={props.message.mediaURL && props.message.mediaURL!=="" 
                                        && isImage(props.message.mediaURL)?props.message.mediaURL:""} width="100%" />
                            
                            {videoPrev}
                 <Emojify style={{height: 32, width: 32}} onClick={e => alert(e.target.title)}>

                    {props.message.text}
                    </Emojify>
                </p>
            </div>
        </div>
    )
    }
};

export default Message;