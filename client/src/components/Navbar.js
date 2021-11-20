import React, { useState } from 'react'
import {useHistory, Link} from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'
import Avatar from 'react-avatar';
import Modal from './Modal'
import styled from 'styled-components'
import { MdLogout } from 'react-icons/md'
import {BiMessageAdd} from 'react-icons/bi'
import AvatarGroup from 'react-avatar-group'
import {logOutUser} from '../states/usersSlice'
import {removeAllUsers} from '../states/allusersSlice'
import {removeMemberships} from '../states/membershipsSlice'
import {removeMultipleMessages} from '../states/messagesSlice'
import {removeTeams} from '../states/teamsSlice'

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
        }).then(() => {
            history.push('/')
            dispatch(logOutUser())
            dispatch(removeAllUsers())
            dispatch(removeMemberships())
            dispatch(removeMultipleMessages())
            dispatch(removeTeams())
        })
    }

    return (
        <NavDiv >
            {/* <h3>{userInfo.name}</h3> */}
            <div>
                <NewMessage onClick={() => history.push('/teams/create')}/>
            </div>
            <RightDiv>
                <AvatarGroup avatars={[userInfo.name]} initialCharacters={1} max={1} size={50} shadow={4}/>
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
    margin-right: 20px;
`

export default Navbar
