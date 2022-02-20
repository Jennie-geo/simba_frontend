import React, { useState } from 'react';
import PropTypes from 'prop-types';


export async function loginUser(credentials) {
    return fetch('localhost:3800/api/v1/user/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(data => data.json())
}

// export default function Login({ setToken }) {
// ...
