import React from 'react'

import { Navigate,Outlet } from 'react-router-dom'

export const AdminComponent = () => {
    const adminAuth = localStorage.getItem('AdminToken')
    return adminAuth ? <Outlet/> : <Navigate to="admin"/>
}

