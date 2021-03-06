import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const UserPreviews = props => {
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
                    width: '25%',
                })}>
                    <img src={props.user.profilePicture} height="60" width="60" alt=""
                         className={css({
                             borderRadius: 50,
                         })}/>
                </span>
                <span className={css({
                    width: '50%'
                })}>
                    <h5><span className={css({color:"#00ff00",fontSize:"30px"})}>{props.user.online?'•':''}</span>{props.user.first_name + ' ' + props.user.last_name}</h5>
                    <h6 className={css({opacity: '0.5'})}>{props.user.username}</h6>
                </span>
                <span className={css({
                    width: '25%',
                })}>
                <NavLink to={`./profile/${props.user.username}`}
                         className={css({
                             color: 'black',
                             textDecoration: 'none',
                             '&:hover': {
                                 color: '#45AAEB'
                             }
                         })}>
                    <i className="fa fa-angle-right fa-2x"
                       style={{float: 'right'}}
                       onClick={props.profileOnClick}></i>
                </NavLink>
            </span>
            </div>
        </div>
    );
};
export default UserPreviews;