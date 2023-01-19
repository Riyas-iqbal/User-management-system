import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

function AdminLogin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const navigate = useNavigate()
    
    useEffect(() => {
        const adminAuth = localStorage.getItem('AdminToken')
        if(adminAuth){
            navigate('/admin/home')
        }

        const auth = localStorage.getItem('token')
        if(auth){
            navigate('/login')
        } // eslint-disable-next-line
    }, [])
    

    const handleSubmit = async ()=>{
        console.log({email,password})
        if (!email && !password) {
            setError('please enter your email and password')
            return false
        }
        fetch('http://localhost:3001/admin',{
            method:'post',
            body: JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json'
            }
        })
            .then(result=>{
                result.json().then((result)=>{
                    console.log(result)
                    if (result.error) {
                        setError(result.error)
                        return false
                    } 
                    if (result.adminAuth) {
                        localStorage.setItem('AdminToken',JSON.stringify(result.adminAuth))
                        navigate('/admin/home')
                    }
                }).catch((e)=>{
                    console.log('error',e);
                })
            })
            .catch(e=>navigate('/notFound'))
        
    }

    return (
        <div className='register-box'>
            <div className='register'>
                <h1 style={{ textAlign: 'center' }}>Admin Login</h1>

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

export default AdminLogin