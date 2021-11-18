import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../../index'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { teamsSelectors, updateTeam } from '../../states/teamsSlice'
import { messagesSelectors, addMessage } from '../../states/messagesSlice'


const MessageTeam = () => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const {team_id} = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === parseInt(team_id))
    const team = useSelector(teamsSelectors.selectAll).find(team => team.id === parseInt(team_id))
    console.log(team)

    useEffect(() => {
        //create a subscription to MessagesChannel
        const channel = cable.subscriptions.create({
            channel: 'MessagesChannel',
            id: parseInt(team_id),
        })
        //save the subscription to state channel
        setChannel(channel)
        //unsubscribe
        return () => {
            channel.unsubscribe()
        }
    }, [userInfo, team_id])

    useEffect(() => {
        cable.subscriptions.create({
            channel: "MessagesChannel",
            id: parseInt(team_id)
        },
        {
            received: (data) => {
                console.log(data)
                const userMatch = team.users.find(user => user.id === data.user_id)
                console.log(userMatch)
                const newData = {
                    id: data.id,
                    content: data.content,
                    created_at: data.created_at,
                    team: {
                        id: team.id,
                        name: team.name,
                        description: team.description
                    },
                    user: {...userMatch}
                }
                dispatch(addMessage(newData))
                // const newMessage = {
                //     ...data, 
                //     user: userInfo
                // }
                // const newData = {
                //     ...team,
                //     messages: [...team.messages, newMessage]
                // }
                
                // dispatch(updateTeam([team_id, newData]))
            }
        }
        )
    }, [userInfo, dispatch])

    const {user_id} = {
        user_id: userInfo.id
    }

    const sendMessage = (content) => {
        const data = { team_id, user_id, content }
        // console.log(data)
        channel.send(data)
    }

    return (
        <div>
            {messages.length ? <MessageList messages={messages} /> : null}
            <MessageForm sendMessage={sendMessage}/>
            {/* <button onClick={() => sendMessage(content)}>BUTTON</button> */}
        </div>
    )
}

export default MessageTeam
