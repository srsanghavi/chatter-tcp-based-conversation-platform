import React from 'react';
import {css} from 'emotion';
import { NavLink } from 'react-router-dom';

const SearchBar = props => {
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
                <input className="input-group-text"
                       placeholder='Search...'
                       value={props.search}
                       style={{
                           textAlign: 'left',
                           width: '70%',
                           color: 'black',
                           border: '0.05em solid gray'
                       }}
                       onChange={props.onChange}/>
            </div>
        </div>
    );
};

export default SearchBar;