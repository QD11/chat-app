import React, { useState, useContext, useEffect } from 'react'
import { ActionCableContext } from '../index'
import { useDispatch, useSelector } from 'react-redux'
import { messageReceived} from '../states/messagesSlice'

const TeamListItem = ({team}) => {
    const cable = useContext(ActionCableContext)
    const dispatch = useDispatch()

    useEffect(() => {
        cable.subscriptions.create({
            channel: "MessagesChannel",
            id: team.id
        },
        {
            received: (data) => {
                console.log(data)
                dispatch(messageReceived(data))
            }
        }
        )
    }, [team])

    const stuff = useSelector(state => state.messageSlice.entities)
    console.log(typeof stuff, stuff)

    return (
        <div>
            {team.description}
        </div>
    )
}

export default TeamListItem
