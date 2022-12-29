import React, {useState} from 'react';
import Login from '../components/Login';
import Register from '../components/Register';

const LogReg = (props) => {
    const {userId, setUserId} = props
    return (
        <>
            <Register userId={userId} setUserId={setUserId}/>
            <Login userId={userId} setUserId={setUserId}/>
        </>
)}

export default LogReg;