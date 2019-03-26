import React from 'react'
import  { Redirect } from 'react-router-dom'

const Authentication = props => {
    if (localStorage.getItem('loggedIn') === 'true') {
        return props.page
    } else {
        return <Redirect to='/login'/>
    }
};

export default Authentication;