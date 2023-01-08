import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Home.css'

function Home() {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.clear()
        navigate('login')
    }
    
      return (
        <div className='home'>
          <div>
            <div className="options" onClick={()=>navigate('/')}>
              <h2 className='text'>Home</h2>
            </div>
            <div className="options" onClick={()=>navigate('/profile')}>
            <h2 className='text'>View Profile</h2>
            </div>
          </div>
          <div>
            <div className="options" onClick={()=>navigate('/profile/update')}>
            <h2 className='text'>Update Profile</h2>
            </div>
            <div className="options red-hover" onClick={logout}>
                <h2 className='text'>Log Out</h2>
            </div>
          </div>
        </div>
      )
}

export default Home