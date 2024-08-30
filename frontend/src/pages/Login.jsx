import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import Loginform from '../components/UI/Loginform'

function Login() {
  return (
    <Helmet title="Login">
      <Loginform/>
    </Helmet>
  )
}

export default Login