import React from 'react';
import {css} from 'emotion';
import {NavLink} from 'react-router-dom';

const ConversationHeader = props => {
    return (
        <div className={css({
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '5em',
            color: 'white',
            backgroundColor: '#342E37',
            boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
            zIndex: 10,
            border: '0.05em solid black',

        })}>
            <div className={css({
                display: 'flex',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em',
            })}>
                <span className={css({
                    width: '20%'
                })}>
                    {props.inThread ?
                    <NavLink to={`/conversations/${props.conversationId}`}
                             className={css({
                                 color: 'white',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <i className="fa fa-arrow-left fa-2x"></i>
                    </NavLink> :
                    <NavLink to='../conv-redirect'
                             className={css({
                                 color: 'white',
                                 textDecoration: 'none',
                                 '&:hover': {
                                     color: '#45AAEB'
                                 }
                             })}>
                        <i className="fa fa-arrow-left fa-2x"></i>
                    </NavLink>}

                </span>
                <span className={css({
                    width: '60%',
                })}>
                    <img src="../images/image.png" height="60" width="60" alt=""
                         className={css({
                             display: 'block',
                             marginLeft: 'auto',
                             marginRight: 'auto',
                             borderRadius: 50,
                    })}/>
                </span>
                <span className={css({
                    width: '20%'
                })}>
                    <i className="fa fa-search fa-2x"
                       onClick={props.searchClick}
                        style={{
                            float: 'left',
                            color: props.search ? '#45AAEB' : 'white',
                        }}></i>
                    <i className="fa fa-cog fa-2x"
                       style={{float: 'right'}}></i>
                </span>
            </div>
        </div>
    );
};

export default ConversationHeader;