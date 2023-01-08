import React from 'react'
import { useNavigate } from 'react-router-dom'

function AdminHome() {
    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem('AdminAuth')
        navigate('/admin')
    }

  return (
    <div className='home'>
          <div>
            <div className="options" onClick={()=>navigate('/')}>
              <h2 className='text'>Home</h2>
            </div>
            <div className="options" onClick={()=>navigate('/admin/users')}>
            <h2 className='text'>View Users</h2>
            </div>
          </div>
          <div>
            <div className="options" onClick={()=>navigate('/admin/users')}>
            <h2 className='text'>Delete Users</h2>
            </div>
            <div className="options red-hover" onClick={logout}>
                <h2 className='text'>Log Out</h2>
            </div>
          </div>
        </div>
  )
}

export default AdminHome