import React, { useState } from 'react'
import LoginForm from '../components/homepage/LoginForm'
import SignupForm from '../components/homepage/SignupForm'

function Login({setUser}) {
    const [showLogin, setShowLogin] = useState(true);

    return (
        showLogin ? (
        <>
            <LoginForm setUser={setUser}/>
            <p>
            Don't have an account? &nbsp;
            <button color="secondary" onClick={() => setShowLogin(false)}>
              Sign Up
            </button>
          </p>
        </>
        
        ) : ( 
        <>
            <SignupForm setUser={setUser}/>
        </>
        )
    )
}

export default Login
