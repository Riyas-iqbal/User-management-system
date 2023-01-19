import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'

function SignUp() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const AdminAuth = localStorage.getItem('AdminToken')
        if (AdminAuth) {
            navigate('/admin')
        }
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        } // eslint-disable-next-line
    }, [])


    const handleSubmit = async () => {
        if (password.length < 6) {
            setError('Password should be atleast 6 characters')
            return false
        }
        console.log({ name, email, password })
        let result = await fetch('http://localhost:3001/register', {
            method: 'post',
            body: JSON.stringify({ name, email, password }),
            headers: {
                'Content-Type': 'application/json'
                
            }
        })
        result.json().then((result) => {
            if (result.error) {
                setError(result.error)
                return false
            }
            if(result.auth){
                console.log(result)
                localStorage.setItem('user', JSON.stringify(result.result))
                localStorage.setItem('token', JSON.stringify(result.auth))
                navigate('/')
            } else {
                console.log('unhandled error') //development
            }
        })
    }

    return (
        <div className='register-box'>
            <div className='register'>
                <h1 style={{ textAlign: 'center' }}>Register</h1>

                <input className='input' value={name} onChange={(e) => {
                    setName(e.target.value)
                }} type="text" placeholder='Enter Your Name' />
                <input className='input' value={email} onChange={(e) => {
                    setEmail(e.target.value)
                }} type="email" placeholder='Enter Your Email' />
                <input className='input' value={password} onChange={(e) => {
                    setPassword(e.target.value)
                }} type="password" placeholder='Enter Your Password' />

                <h3 className='error'>{error}</h3>

                <div className='action-btn'>
                    <button onClick={handleSubmit} className='signUp-btn' >Sign Up</button>
                    <button onClick={() => navigate('/login')} className='signUp-btn' >Login</button>
                </div>

            </div>
        </div>
    )
}

export default SignUp