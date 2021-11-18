import React, { useState } from 'react'
import {useHistory} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {logOutUser} from '../states/usersSlice'
import Avatar from 'react-avatar';
import Modal from './Modal'

function Navbar() {
    const history = useHistory()
    const userInfo = useSelector(state => state.usersInfo)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    const [image, setImage] = useState("")

    const onLogOut = () => {
        fetch('/logout', {
            method: 'DELETE',   
        }).then(() => dispatch(logOutUser()))
        history.push('/')
    }

    return (
        <header className="navbar">
            <p>{userInfo.name}</p>
            <Avatar
            onClick={() => setModalOpen(true)}
            name={userInfo.name} 
            size="100" 
            round={true}
            src={image}
            />
            {modalOpen && <Modal image={image} setImage={setImage} setOpenModal={setModalOpen} />}
            <button onClick={onLogOut}>Log Out</button>
        </header>
    )
}

export default Navbar
