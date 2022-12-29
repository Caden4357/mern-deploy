import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../images/logo.jpg'

const Nav = (props) => {
    const {userId, setUserId} = props
    const navigate = useNavigate()
    const [user, setUser] = useState({})

    // ! Get logged in user. Should look into using context instead 
    useEffect(() => {
        axios.get(`http://localhost:8000/api/loggedInUser/${userId}`)
        .then((res) => {
            setUser(res.data.user)
        })
        .catch((err) => {
            console.log(err);
        })
    }, [])

    const logout = () => {
        axios.get('http://localhost:8000/api/logout', {withCredentials: true})
            .then((res) => {
                setUserId('')
                navigate('/')
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <div className='d-flex justify-content-evenly align-items-center border-bottom'>
            <div className='d-flex justify-content-evenly align-items-center w-25'>
                <h3>Welcome Back {user.firstName}!</h3>
            </div>
            <div className='d-flex justify-content-evenly align-items-center'>
                <h2>Rec</h2>
                <img src={logo} alt="Logo" style={{width:'75px'}} />
                <h2>rd Collections</h2>
            </div>
            <div className='w-25'>
                <button className='btn btn-dark' onClick={logout}>Logout</button>
            </div>
        </div>
)}

export default Nav;