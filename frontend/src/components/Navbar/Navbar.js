import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
    const auth = localStorage.getItem('user')
    const admin = localStorage.getItem('AdminToken')
    useNavigate()
    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }
    const adminLogout = () => {
        localStorage.removeItem('AdminToken')
    }
    
    

    return (
        <div>
            <ul className='navbar'>
                {

                    admin ?
                        <>
                            <li><Link className='nav-link' to={'/admin/home'}>Admin</Link></li>
                            <li><Link className='nav-link' to={'/admin/users'}>View Users</Link></li>
                            <li><Link className='nav-link' to={'/admin/users'}>update Users</Link></li>
                            <li><Link className='nav-link' onClick={adminLogout} to={'/admin'}>Logout </Link></li>
                        </>
                        :
                        auth ?
                            <>
                                <li><Link className='nav-link' to={'/'}>Home</Link></li>
                                <li><Link className='nav-link' to={'/profile'}>Profile</Link></li>
                                <li><Link className='nav-link' to={'/profile/update'}>Update Profile</Link></li>
                                <li><Link className='nav-link' onClick={logout} to={'/login'}>Logout ({JSON.parse(auth).name})</Link></li>
                            </>
                            :
                            <div className='nav-right'>
                                <li><Link className='nav-link' to={'/signup'}>Signup</Link> </li>
                                <li><Link className='nav-link' to={'/login'}>Login</Link></li>
                                <li><Link className='nav-link' style={{color:'darkblue'}} to={'/admin'}>Admin</Link></li>
                            </div>
                }

            </ul>
        </div>
    )
}

export default Navbar