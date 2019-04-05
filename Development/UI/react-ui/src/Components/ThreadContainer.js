import React, {Component} from 'react';
import {css} from 'emotion';
import ThreadPreview from "./ThreadPreview";
import moment from "moment/moment";

class ThreadContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            threads: {
                id: 0,
                messages: [],
            }
        }
    }

    componentDidMount(){
        this.setState({
            thread_id:this.props.threads,
        })
    }
    render(){
        const props = this.props;
        let previousDate = moment('0000-00-00', 'YYYY-MM-DD');

        for(let i = 0; i < props.threads.length; i++) {
            if(moment(props.threads[i].messages[0].message_created_on).isSame(previousDate, 'day')) {
                props.threads[i].displayDate = moment(props.threads[i].messages[0].message_created_on).format('h:mm a');
            } else if(moment(props.threads[i].messages[0].message_created_on).isSame(previousDate, 'minute')) {
                props.threads[i].displayDate = null;
            } else {
                props.threads[i].displayDate =  moment(props.threads[i].messages[0].message_created_on).format('MMMM Do YYYY, h:mm a');
                previousDate = moment(props.threads[i].created_on);
            }
        }

        if(props === null || props.threads === null || props.threads === undefined || props.threads === []) {
            return null
        } else {
            return (
                <div className={css({
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    height: '100%',
                    overflowX: 'hidden',
                    paddingBottom: '5em'
                })}>
                    {props.threads.map(thread => {
                        // let threadMessages = props.messages.filter(message => {
                        //     return message.thread_id === thread.id
                        // });
                        return (
                            <ThreadPreview threadMessages={thread.messages}
                                        threadId={thread.id}
                                        conversationId={this.props.conversation_id}
                                        displayDate={thread.messages[0].message_created_on}/>
                        )
                    })}
                </div>
            )
        }
    }
};

export default ThreadContainer;