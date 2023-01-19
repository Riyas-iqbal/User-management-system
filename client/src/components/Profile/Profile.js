import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Profile.css'

function Profile() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [age, setAge] = useState()
    const [address, setAddress] = useState('')
    const [imageUrl,setImageUrl] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        async function getData() {
            const auth = localStorage.getItem('user')
            let result = await fetch(`http://localhost:3001/profile/${JSON.parse(auth)._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    authorization : JSON.parse(localStorage.getItem('token'))
                }
            })
            result.json().then((result) => {
                if (result.error) {
                    navigate('/notFound')
                    console.log(result.error)
                    return false
                }
                console.log(result)
                setName(result.name)
                setEmail(result.email)
                setAge(result.age)
                setAddress(result.address)
                setImageUrl(result?.imageUrl)
            }).catch((e) => {
                navigate('/notFound')
                console.log('error', e);
            })
        }
        getData() // eslint-disable-next-line
    }, [])


    return (
        <div className='profile'>
                <h1 style={{ textAlign: 'center' }}>View Profile</h1>
                <img className='profile-photo' src={ imageUrl ? `http://localhost:3001/${imageUrl}` : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'} alt="" />
            <div className='profile-box'>
                <h3>Name : {name}</h3>
                <h3>Email : {email}</h3>
                <h3>Age : {age}</h3>
                <h3>Address : {address}</h3>
                <div style={{display:'flex',justifyContent:'center'}}>
                    <button className='update-btn' onClick={()=>navigate('/profile/update')}>Update Profile</button>
                </div>
            </div>
        </div>
    )
}

export default Profile