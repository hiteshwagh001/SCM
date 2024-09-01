import React from 'react'
import Helmet from '../components/Helmet/Helmet'
import SignupForm from '../components/UI/SignupForm'
function Signup() {
  return (
    <Helmet title="signup">
        <SignupForm/>
    </Helmet>
  )
}

export default Signup