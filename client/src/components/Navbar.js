import React, { useState } from 'react'
import {useHistory, Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import {logOutUser} from '../states/usersSlice'
import Avatar from 'react-avatar';
import Modal from './Modal'
import styled from 'styled-components'
import { MdLogout } from 'react-icons/md'
import {BiMessageAdd} from 'react-icons/bi'
// import { motion } from "framer-motion"

function Navbar({image, setImage}) {
    const history = useHistory()
    const userInfo = useSelector(state => state.usersInfo)
    const dispatch = useDispatch()
    const [modalOpen, setModalOpen] = useState(false);
    // const [image, setImage] = useState("")

    const onLogOut = () => {
        fetch('/logout', {
            method: 'DELETE',   
        }).then(() => dispatch(logOutUser()))
        history.push('/')
    }

    return (
        <NavDiv >
            {/* <h3>{userInfo.name}</h3> */}
            <div>
                <NewMessage onClick={() => history.push('/teams/create')}/>
            </div>
            <RightDiv>
                <Avatar
                onClick={() => setModalOpen(true)}
                name={userInfo.name} 
                size="50" 
                round={true}
                src={image}
                />
                {modalOpen && <Modal image={image} setImage={setImage} setOpenModal={setModalOpen} />}
                {/* <button onClick={onLogOut}><MdLogout size="30px"/></button> */}
                <Logout onClick={onLogOut}/>
            </RightDiv>
        </NavDiv>
    )
}

const RightDiv = styled.div`
    display: flex;
    align-items: center;
`

const NewMessage = styled(BiMessageAdd)`
    font-size: 50px;
    margin-left: 15px;
    cursor: pointer;
`

const NavDiv = styled.div.attrs(props => ({
    className: 'NavDiv'
}))`
    display: flex;
    background-color: #e4d1d1;
    align-items: center;
    justify-content: space-between;
    height: 8vh;
`

const Logout = styled(MdLogout)`
    font-size: 35px;
    margin-left: 15px;
    cursor: pointer;
`

export default Navbar
