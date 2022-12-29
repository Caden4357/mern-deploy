import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Register = (props) => {
    const {userId, setUserId} = props
    const navigate = useNavigate()
    const [errors, setErrors] = useState({})
    const [user, setUser] = useState({
        firstName: '',
        lastName:'',
        email:'', 
        password: '',
        confirmPassword:''
    })

    const changeHandler = (e) => {
        setUser({...user, [e.target.name]: e.target.value})
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/register', user, {withCredentials:true})
            .then((res) => {
                setUserId(res.data.newUser._id)
                setErrors({})
                navigate('/home')
            })
            .catch((err) => {
                setErrors(err.response.data.error.errors)
            })
    }
    return (
        <div>
            <h2>Register</h2>
            {/* {
                errors?
                <p className='text-danger'>{errors}</p>:
                null
            } */}
            <form onSubmit={submitHandler} className='w-50 mx-auto '>
                <label className='form-label' htmlFor="firstName">First Name:</label>
                <input className='form-control' value={user.firstName} type="text" name="firstName" id="firstName" onChange={changeHandler} />
                {
                    errors.firstName?
                    <p className='text-danger'>{errors.firstName.message}</p>:
                    null
                }
                <label className='form-label' htmlFor="lastName">Last Name:</label>
                <input className='form-control' value={user.lastName} type="text" name="lastName" id="lastName" onChange={changeHandler}/>
                {
                    errors.lastName?
                    <p className='text-danger'>{errors.lastName.message}</p>:
                    null
                }
                <label className='form-label' htmlFor="email">Email:</label>
                <input className='form-control' value={user.email} type="text" name="email" id="email" onChange={changeHandler}/>
                {
                    errors.email?
                    <p className='text-danger'>{errors.email.message}</p>:
                    null
                }
                <label className='form-label' htmlFor="password">Password:</label>
                <input className='form-control' value={user.password} type="password" name="password" id="password" onChange={changeHandler}/>
                {
                    errors.password?
                    <p className='text-danger'>{errors.password.message}</p>:
                    null
                }
                <label className='form-label' htmlFor="confirmPassword">Confirm Password:</label>
                <input className='form-control' value={user.confirmPassword} type="password" name="confirmPassword" id="confirmPassword" onChange={changeHandler}/>
                {
                    errors.confirmPassword?
                    <p className='text-danger'>{errors.confirmPassword.message}</p>:
                    null
                }
                <button className='btn btn-primary'>Register</button>
            </form>
        </div>
)}

export default Register;