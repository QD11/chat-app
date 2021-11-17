import React, { useState } from 'react'
import LoginForm from '../components/homepage/LoginForm'
import SignupForm from '../components/homepage/SignupForm'
import {useHistory} from "react-router-dom";

function Login({setUser, handleLogin}) {
    const history = useHistory()
    // const [showLogin, setShowLogin] = useState(true);

    return (
        <div>
          <LoginForm setUser={setUser} handleLogin={handleLogin}/>
          <p>
          Don't have an account? &nbsp;
          <button color="secondary" onClick={() => history.push('/signup')}>
            Sign Up
          </button>
          </p>
        </div>
    )
}

export default Login
