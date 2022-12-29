import React, {useState} from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = (props) => {
    const {userId, setUserId} = props
    const navigate = useNavigate()
    const [errors, setErrors] = useState('')
    const [user,setUser] = useState({
        email:'',
        password:''
    })


    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/login', user, {withCredentials:true})
            .then((res) => {
                setUserId(res.data.user._id)
                setErrors('')
                navigate('/home')
            })
            .catch((err) => {
                setErrors(err.response.data.error)
            })
    }
    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={submitHandler} className='w-50 mx-auto '>
                {
                    errors?
                    <p className='text-danger'>{errors}</p>:
                    null
                }
                <label className='form-label' htmlFor="email">Email:</label>
                <input className='form-control' value={user.email} type="text" name="email" id="email" onChange={changeHandler} />

                <label className='form-label' htmlFor="password">Password:</label>
                <input className='form-control' value={user.password} type="password" name="password" id="password" onChange={changeHandler}/>
                <button className='btn btn-primary'>Login</button>
            </form>
        </div>
)}

export default Login;