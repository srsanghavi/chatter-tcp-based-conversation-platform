import React,{Component} from 'react';
import {css} from 'emotion';
import {EmojiPicker} from 'emoji-picker-react';


class ConversationFooter extends Component{
    constructor(props){
        super(props);
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
                <span className={css({width: '15%'})}></span>
                <span className={css({
                    width: '70%'
                })}>

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
                        width: '15%'
                })}>
                    {/* <EmojiPicker onEmojiClick={this.handleEmojiClick}/> */}
                    <i className='fa fa-paper-plane'
                    style={{
                            fontSize: '1.5em',
                            marginLeft: 10,
                            color: 'white'
                        }}
                    onClick={props.onClick}/>
                </span>
            </div>
        );
    }
};

export default ConversationFooter;