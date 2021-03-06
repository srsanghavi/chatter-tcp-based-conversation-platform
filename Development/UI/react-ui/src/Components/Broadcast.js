import React from 'react';
import {css} from 'emotion';

const Broadcast = props => {
    return (
        <div className={css({
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '3em',
            color: 'white',
            padding: '0 0.75em',
            border: '0.05em solid gray',
            backgroundColor: 'white',
            boxShadow: '0px 0px 25px 0px rgba(0,0,0,0.75)',
            zIndex: 5
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>
                <span className={css({width: '15%'})}></span>
                <span className={css({
                    width: '70%'
                })}>
                <input
                    type='text'
                    placeholder='Send broadcast...'
                    value={props.value}
                    onChange={props.onChange}
                    className="input-group-text"
                    style={{
                        width: '100%',
                        textAlign: 'left',
                        color: 'black',
                        border: '0.05em solid gray'
                    }}
                />
            </span>
                <span className={css({
                    width: '15%'
                })}>
                <i className='fa fa-paper-plane' id='broadcastIcon'
                   style={{
                       fontSize: '1.5em',
                       marginLeft: 10,
                       color: '#342E37'
                   }}
                   onClick={props.onClick}/>
            </span>
            </div>
        </div>
    );
};

export default Broadcast;