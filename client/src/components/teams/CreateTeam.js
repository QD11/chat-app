import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../../index'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllUsers, allUsersSelectors } from '../../states/allusersSlice'
import DragAndDrop from './DragAndDrop'
import styled from 'styled-components'

const sortByName = (list) => {
    const newList = [...list]
    newList.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return newList
}

const CreateTeam = () => {
    const cable = useContext(ActionCableContext)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const allUsersInfo = useSelector(allUsersSelectors.selectAll)
    const [channel, setChannel] = useState(null)
    const [users, setUsers] = useState([])

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        content: '',
    })

    const [state, setState] = useState({
        "users": {
        title: "List of Users",
        items: []
        },
        "members": {
        title: "Friends!",
        items: []
        },
    })

    useEffect(() => { 
        //create a subscription to NewTeamChannel
        const channel = cable.subscriptions.create({
            channel: 'NewTeamChannel'
        })
        //save the subscription to state channel
        setChannel(channel)
        //unsubscribe

        console.log(userInfo)
        console.log(allUsersInfo)

        const filteredUsersInfo = [...allUsersInfo].filter(user => user.id !== userInfo.id)
        const a = JSON.parse(JSON.stringify(filteredUsersInfo))
        a.forEach(user => user.id = user.id.toString())
        setState({
            "users": {
            title: "List of Users",
            items: a
            },
            "members": {
            title: "Friends!",
            items: []
            },
        })
        

        return () => {
            channel.unsubscribe()
        }
    }, [userInfo])

    const handleFormChange = (e) => {
        setFormData(formData => {
            return({
            ...formData,
            [e.target.name] : e.target.value
        })})
    }

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const preState = JSON.parse(JSON.stringify(state));
        const preMembers = [...preState.members.items]
        preMembers.forEach(user => user.id = parseInt(user.id))
        const newUsers = [userInfo].concat(preMembers)
        const data = {
            name: formData.name,
            description: formData.description,
            users: newUsers,
            content: formData.content,
            user_id: userInfo.id,
        }
        //channel.send(data)
        console.log(data)
        //reset the states
        setFormData({
            name: '',
            description: '',
            content: '',
        })
        const afterState = JSON.parse(JSON.stringify(preState));
        const afterUsers = afterState.users.items.concat(afterState.members.items)
        afterUsers.forEach(user => user.id = user.id.toString())
        const sortedAfterUsers = sortByName(afterUsers)
        setState({
            "users": {
            title: "List of Users",
            items: sortedAfterUsers
            },
            "members": {
            title: "Friends!",
            items: []
            },
        })
    }

    return (
        <BigDiv>
            <form onSubmit={handleFormSubmit}>
            <SubmitBut type="submit" disabled={!state.members.items.length || !formData.name || !formData.description  ? true: false}>CREATE</SubmitBut>
                <div>
                    <LeftDiv >
                        <label>Chat Name</label>
                        <input type="text" name="name" onChange={handleFormChange} value={formData.name}></input>
                        {/*  */}
                        <label>Description</label>
                        <input type="text" name="description" onChange={handleFormChange} value={formData.description}></input>
                        {/*  */}
                        {/* <label>Add your friends!</label>
                        <input type="search" onChange={e => setSearchFilter(e.target.value)} value={searchFilter}></input>
                        {filteredFriends.map(user => <div key={user.id} onClick={() => addToMembers(user)}>{user.name}</div>)}
                        <br/>
                        <label>Friends!</label>
                        {members.map(member => <div key={member.id} onClick={() => addToUsers(member)}>{member.name}</div>)} */}
                        <label>Initial Message</label>
                        <input type="text" name="content" onChange={handleFormChange} value={formData.content}></input>
                    </LeftDiv>
                    <RightDiv>
                        <DragAndDrop state={state} setState={setState}/>
                    </RightDiv>
                </div>
        
            </form>
            {/* <DragAndDrop state={state} setState={setState}/> */}
        </BigDiv>
    )
}

const SubmitBut = styled.div`
    margin-left: 40px;
    width: 100%;
    display: flex;
    //align-items: center;
    justify-content: center;
    cursor: pointer;
    // margin-top: 5px;
    margin: 20px;
    font-size: 1rem;
    background-color: rgb(70, 153, 179);
    border: 1px solid transparent;
    border-radius: 6px;
    padding: 020px 16px;
    text-decoration: none;
    -webkit-text-emphasis: bold;
    text-emphasis: bold;
    font-family: 'Raleway', sans-serif;
`

const BigDiv = styled.div`
    width: 83vw;
    height: 92vh;
    overflow-y: scroll;
    &::-webkit-scrollbar {
        display: none; /* for Chrome, Safari, and Opera */
    }
`

const LeftDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 45px;

`

const RightDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center
`


export default CreateTeam
