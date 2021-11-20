import React, { useState, useContext, useEffect, Component } from 'react'
import { ActionCableContext } from '../../index'
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux'
import MessageList from './MessageList'
import MessageForm from './MessageForm'
import { teamsSelectors, updateTeam } from '../../states/teamsSlice'
import { messagesSelectors, addMessage } from '../../states/messagesSlice'
import { setMembership } from '../../states/membershipsSlice'
import styled from 'styled-components'
import ScrollToBottom from 'react-scroll-to-bottom'

const MessageTeam = () => {
    const cable = useContext(ActionCableContext)
    const [channel, setChannel] = useState(null)
    const {team_id} = useParams()
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === parseInt(team_id))
    const teamsInfo = useSelector(teamsSelectors.selectAll)
    const team = teamsInfo.find(team => team.id === parseInt(team_id))
    const membership_id = team.memberships.find(membership => membership.user.id === userInfo.id).id

    const updateLastRead = () => {
        const currentDateTime = (new Date).toISOString()
        const data = {
            id: membership_id,
            last_read_at: currentDateTime,
        }
        fetch(`http://localhost:3000/memberships/${membership_id}`, {
            method: "PATCH",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(data)
        })
        .then(r => r.json())
        .then(data => {
            const newData = {
                id: data.id,
                last_read_at: data.last_read_at,
                user: userInfo,
                team: {
                    id: team.id,
                    description: team.description,
                    name: team.name
                }
            }
            //not getting added
            //update if it exists but not add itif it doesn't exist
            dispatch(setMembership(newData))
        })
    }

    useEffect(() => {
        updateLastRead()
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
            updateLastRead()
        }
    }, [userInfo, team_id])

    useEffect(() => {
        cable.subscriptions.create({
            channel: "MessagesChannel",
            id: parseInt(team_id)
        },
        {
            received: (data) => {
                const userMatch = team.users.find(user => user.id === data.user_id)
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
            }})
    }, [userInfo, team_id])

    const {user_id} = {
        user_id: userInfo.id
    }

    const sendMessage = (content) => {
        const data = { team_id, user_id, content }
        channel.send(data)
    }

    return (
        <>
            <ScrollToBottom className="scrollbot">
                {messages.length ? <MessageList messages={messages} /> : null}
            </ScrollToBottom>
            <MessageForm sendMessage={sendMessage} team_id={team_id}/>
        </>
    )
}

const MessagesDiv = styled.div`
    overflow-y: scroll;
    min-height: 91%;
    overflow-x: hidden;

`


export default MessageTeam
