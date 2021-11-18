import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../../index'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { teamsSelectors } from '../../states/teamsSlice'


const MessageTeam = () => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const {team_id} = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const messages = useSelector(teamsSelectors.selectAll).find(team => team.id === parseInt(team_id)).messages
    console.log(messages)
    // const messages = useSelector(messagesSelectors.selectAll).find(message => message.id === parseInt(team_id)).messages

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
    }, [userInfo])

    useEffect(() => {
        cable.subscriptions.create({
            channel: "MessagesChannel",
            id: parseInt(team_id)
        },
        {
            received: (data) => {
                //const newData = [...teamSlice, data]
                // dispatch(updateLatestMessage(newData))
                // console.log(data)
                // const messagesPerTeamPayload = {
                //     id: data.id,
                //     messagesPerTeam,
                //     userInfo,
                //     data
                // }
                // dispatch(messageReceived(messagesPerTeamPayload))
            }
        }
        )
    }, [userInfo, dispatch, team_id])

    const {user_id} = {
        user_id: userInfo.id
    }

    const sendMessage = (content) => {
        const data = { team_id, user_id, content }
        channel.send(data)
    }

    return (

        <div className="message-team">
            <MessageList messages={messages} />
            <MessageForm sendMessage={sendMessage}/>
            {/* <button onClick={() => sendMessage(content)}>BUTTON</button> */}
        </div>
    )
}

export default MessageTeam
