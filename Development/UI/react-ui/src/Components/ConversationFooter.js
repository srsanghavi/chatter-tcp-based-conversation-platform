import React,{Component} from 'react';
import {css} from 'emotion';
import {EmojiPicker} from 'emoji-picker-react';
import Mediauploader from './Mediauploader';
import MessageActions from '../Actions/MessageActions';
import AuthStore from '../Store/AuthStore';


class ConversationFooter extends Component{
    constructor(props){
        super(props);
        this.state = {
            editProfilePic:false,
            newMessageMedia:null,
        }
        
        this.onMediaPathSave = this.onMediaPathSave.bind(this);
    }

    onMediaPathSave = (p) => {
        
        MessageActions.createMessageForThread(AuthStore._getAuthUser().username,
                                              AuthStore._getAuthUser().id,
                                              this.props.threadid,
                                              p,
                                              this.props.conversation_id,1)
        
    }

    render(){
        let props = this.props;
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
                border: '0.05em solid black',
            })}>
                <span className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    width: '15%'
                })}>
                      <Mediauploader onSave = {this.onMediaPathSave}
                                     icon={(<i className='fa fa-image'
                                               style={{
                                                   fontSize: '1.5em',
                                                   color: 'white'
                                               }}/>
                                     )}
                      />
                </span>
                <span className={css({
                    width: '70%'
                })}>
                    {this.state.newMessageMedia!==null?"Photo included":""}
                    <input
                        type='text'
                        placeholder='Send message...'
                        value={props.value}
                        onChange={props.onChange}
                        className="input-group-text"
                        style={{
                            width: '100%',
                            textAlign: 'left',
                            color: 'black',
                            border: '0.05em solid gray',
                            backgroundColor: 'white'
                        }}
                    />
                </span>

                <span className={css({
                    display: 'flex',
                    justifyContent: 'center',
                        width: '15%',
                })}>
                    <i className='fa fa-paper-plane'
                    style={{
                            fontSize: '1.5em',
                            color: 'white'
                        }}
                    onClick={props.onClick}/>
                </span>
            </div>
        );
    }
};

export default ConversationFooter;