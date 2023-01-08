import React, { useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import './ErrorPage.css'

function ErrorPage() {

  const navigate = useNavigate()

  useEffect(() => {
    navigate('/notFound') // eslint-disable-next-line
  }, [])

  return (
    <div style={
      {
        background: "url('/error.png')",
        backgroundPosition:'center',
        backgroundSize:'contain',
        backgroundRepeat:'space'
      }
    } className='error-page'>
      <div className='errorText'>
        <h1>404 - Broken Page</h1>
        An Unexpected Error Occured - Please try again later
      </div>
      <div className='errorLinkDiv'>
        <Link className='errorLink' to={'/login'}> Home</Link>
      </div>
    </div>
  )
}

export default ErrorPage