import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../index'
import { useParams } from "react-router-dom";

const MessagesList = () => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const {team_id} = useParams()

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
    }, [])

    const {user_id} = {
        user_id: 1
    }

    const {content} = {
        content: "hi Xinyi"
    }

    const sendMessage = (content) => {
        const data = { team_id, user_id, content }
        channel.send(data)
    }

    return (
        <div>
            <button onClick={() => sendMessage(content)}>BUTTON</button>
        </div>
    )
}

export default MessagesList
