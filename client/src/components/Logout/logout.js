import React from 'react';
import axios from 'axios';

const Logout = (props) => {

    let request = axios.get(`/api/logout`)
        .then(request => {
            props.history.push('/')
        })

    return (
        <div > </div>
    );
};

export default Logout;