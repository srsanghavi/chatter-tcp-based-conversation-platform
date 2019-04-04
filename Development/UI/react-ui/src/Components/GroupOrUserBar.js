import React from 'react';
import {css} from 'emotion';

const GroupOrUserBar = props => {

    return (
        <div className={css({
            display: 'flex',
            position: 'fixed',
            width: '100%',
            height: '3em',
            color: 'white',
            border: '0.05em solid gray',
            borderBottomColor: 'black',
            boxShadow: '0 0 25px 0 rgba(0,0,0,0.5)',
            backgroundColor: 'white',
            zIndex: 5
        })}>
            <div className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    borderRight: '0.05em solid black',
                    backgroundColor: props.userButtonSelected ? '#CEDAE5' : 'white'
                })}
                 onClick={props.onButtonClick}>
                <h6 className={css({
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Titillium Web'
                })}>Users</h6>
            </div>
            <div className={css({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '50%',
                    backgroundColor: props.userButtonSelected ? 'white' : '#CEDAE5'
                    })}
                 onClick={props.onButtonClick}>
                <h6 className={css({
                    color: 'black',
                    fontWeight: 'bold',
                    fontFamily: 'Titillium Web'
                    })}>Groups</h6>
            </div>
        </div>
    );
};

export default GroupOrUserBar;