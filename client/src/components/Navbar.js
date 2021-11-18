import React from 'react'
import {useHistory} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {logOutUser} from '../states/usersSlice'
import {FaUserCircle} from 'react-icons/fa'

function Navbar() {
    const history = useHistory()
    const userInfo = useSelector(state => state.usersInfo)
    const dispatch = useDispatch()

    const onLogOut = () => {
        fetch('/logout', {
            method: 'DELETE',   
        }).then(() => dispatch(logOutUser()))
        history.push('/')
    }

    return (
        <header className="navbar">
            <p>{userInfo.name}<FaUserCircle size={40} /></p>
            <button onClick={onLogOut}>Log Out</button>
        </header>
    )
}

export default Navbar
