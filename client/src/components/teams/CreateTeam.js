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
    const [members, setMembers] = useState([])
    const [searchFilter, setSearchFilter] = useState('')
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        users: []
    })

    useEffect(() => {
        fetch("http://localhost:3000/users")
        .then(resp => resp.json())
        .then(data => setUsers(sortByName(data)))
    }, [])


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

    const filteredFriends = users.filter(user => user.name.toLowerCase().includes(searchFilter.toLowerCase()))

    return (
        <div>
            <form>
                <label>Chat Name</label>
                <input type="text" name="name"></input>
                {/*  */}
                <label>Description</label>
                <input type="text" name="description"></input>
                {/*  */}
                <label>Add your friends!</label>
                <input type="search" onChange={e => setSearchFilter(e.target.value)} value={searchFilter}></input>
                {filteredFriends.map(user => <div onClick={() => addToMembers(user)}>{user.name}</div>)}
                <br/>
                <label>Friends!</label>
                {members.map(member => <div onClick={() => addToUsers(member)}>{member.name}</div>)}
            </form>
        </div>
    )
}

export default CreateTeam
