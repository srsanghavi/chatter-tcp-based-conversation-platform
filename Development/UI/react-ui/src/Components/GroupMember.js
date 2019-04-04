import React from 'react';
import {css} from 'emotion';

const GroupMember = props => {
    return (
        <div className={css({
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            borderBottom: '0.05em solid gray',
            padding: '0.5em 0.5em',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
        })}>
            <div className={css({
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                padding: '0 0.75em'
            })}>

                <span className={css({
                    width: '70%'
                })}>
                    <h5>{props.user.name}</h5>
                    {/* <h6 className={css({opacity: '0.5'})}></h6> */}
                </span>
                <span className={css({
                    width: '25%',
                })}>

            </span>
            </div>
        </div>
    );
};
export default GroupMember;