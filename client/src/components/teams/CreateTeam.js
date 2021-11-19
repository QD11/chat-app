import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../../index'
import { useDispatch, useSelector } from 'react-redux'


const sortByName = (list) => {
    const newList = [...list]
    newList.sort((a, b) => (a.name > b.name) ? 1 : -1)
    return newList
}

const CreateTeam = () => {
    const cable = useContext(ActionCableContext)
    const userInfo = useSelector(state => state.usersInfo)
    const [channel, setChannel] = useState(null)
    const [users, setUsers] = useState([])
    const [initialUsers, setInitialUsers] = useState([])
    const [members, setMembers] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        content: '',
        // users: [userInfo]
    })

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(data => {
            setUsers(sortByName(data.filter(user => user.id !== userInfo.id)))
            setInitialUsers(sortByName(data.filter(user => user.id !== userInfo.id)))
        })
    }, [userInfo])

    const addToMembers = (member) => {
        setMembers(members => {
            const newMembers = [...members, member]
            return sortByName(newMembers)
        })
        setUsers(users => {
            const newUsers = users.filter(user => user.id !== member.id)
            return sortByName(newUsers)
        })
    }

    const addToUsers = (user) => {
        setUsers(users => {
            const newUsers = [...users, user]
            return sortByName(newUsers)
        })
        setMembers(members => {
            const newMembers = members.filter(member => member.id !== user.id)
            return sortByName(newMembers)
        })
    }

    const handleFormChange = (e) => {
        setFormData(formData => {
            return({
            ...formData,
            [e.target.name] : e.target.value
        })})
    }

    useEffect(() => { 
        //create a subscription to NewTeamChannel
        const channel = cable.subscriptions.create({
            channel: 'NewTeamChannel'
        })
        //save the subscription to state channel
        setChannel(channel)
        //unsubscribe
        return () => {
            channel.unsubscribe()
        }
    }, [userInfo])

    const handleFormSubmit = (e) => {
        e.preventDefault()
        const newUsers = [userInfo].concat(members)
        const data = {
            name: formData.name,
            description: formData.description,
            users: newUsers,
            content: formData.content,
            user_id: userInfo.id,
        }
        channel.send(data)
        //reset the states
        setFormData({
            name: '',
            description: '',
            content: '',
        })
        setMembers([])
        setSearchFilter('')
        setUsers(initialUsers)
    }

    console.log(formData)

    const filteredFriends = users.filter(user => user.name.toLowerCase().includes(searchFilter.toLowerCase()))

    return (
        <div>
            <form onSubmit={handleFormSubmit}>
                <button type="submit" disabled={members.length === 0 || !formData.name || !formData.description || !formData.content ? true: false}>CREATE</button>
                <label>Chat Name</label>
                <input type="text" name="name" onChange={handleFormChange} value={formData.name}></input>
                {/*  */}
                <label>Description</label>
                <input type="text" name="description" onChange={handleFormChange} value={formData.description}></input>
                {/*  */}
                <label>Add your friends!</label>
                <input type="search" onChange={e => setSearchFilter(e.target.value)} value={searchFilter}></input>
                {filteredFriends.map(user => <div key={user.id} onClick={() => addToMembers(user)}>{user.name}</div>)}
                <br/>
                <label>Friends!</label>
                {members.map(member => <div key={member.id} onClick={() => addToUsers(member)}>{member.name}</div>)}
                <label>Initial Message</label>
                <input type="text" name="content" onChange={handleFormChange} value={formData.content}></input>
            </form>
        </div>
    )
}

export default CreateTeam
