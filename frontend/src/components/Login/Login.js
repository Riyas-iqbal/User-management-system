import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        console.log('login worked');
        const auth = localStorage.getItem('user')
        if(auth){
            console.log('auth worked');
            navigate('/')
        } // eslint-disable-next-line
    }, [])
    

    const handleSubmit = async ()=>{
        console.log({email,password})
        if (!email && !password) {
            setError('please enter your email and password')
            return
        }
        let result = await fetch('http://localhost:3001/login',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
        result.json().then((result)=>{
            console.log(result)
            if (result.error) {
                setError(result.error)
                return false
            } 
            if (result.auth) {
                localStorage.setItem('user',JSON.stringify(result.user))
                localStorage.setItem('token',JSON.stringify(result.auth))
                navigate('/')
            }
        }).catch((e)=>{
            console.log('error',e);
        })
    }

    return (
        <div className='register-box'>
            <div className='register'>
                <h1 style={{ textAlign: 'center' }}>Login</h1>

                <input className='input' value={email} onChange={(e)=>{
                    setEmail(e.target.value)
                }} type="email" placeholder='Enter Your Email' />
                <input className='input' value={password} onChange={(e)=>{
                    setPassword(e.target.value)
                }} type="password" placeholder='Enter Your Password' />

                <h3 className='error'>{error}</h3>

                <button onClick={handleSubmit} className='signUp-btn' >Login</button>

                
            </div>
        </div>
    )
}

export default Login