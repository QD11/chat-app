import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../../index'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import MessageList from './MessageList'
import MessageForm from './MessageForm'

const MessageTeam = () => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const {team_id} = useParams()

    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const messages = useSelector(state => state.messagesPerTeam.find(message => message.id === parseInt(team_id))).messages

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
    }, [team_id])

    const {user_id} = {
        user_id: userInfo.id
    }

    const {content} = {
        content: "hi Xinyi"
    }

    const sendMessage = (content) => {
        const data = { team_id, user_id, content }
        console.log(data)
        channel.send(data)
    }

    return (
        <div>
            <MessageList messages={messages} />
            <MessageForm sendMessage={sendMessage}/>
            {/* <button onClick={() => sendMessage(content)}>BUTTON</button> */}
        </div>
    )
}

export default MessageTeam
