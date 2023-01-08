import React, { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

function AdminHome() {
    const navigate = useNavigate()
    // useEffect(() => {
    //     const auth = localStorage.getItem('AdminToken')
    //     if(auth){
    //         navigate('/admin/home')
    //     }
    // }, [])

  return (
    <div>AdminHome</div>
  )
}

export default AdminHome