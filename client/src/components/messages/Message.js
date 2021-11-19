import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'
import { parseISO } from 'date-fns'
import Avatar from 'react-avatar';

const Message = ({message}) => {
    const userInfo = useSelector(state => state.usersInfo)
    const content = message.content
    const name = message.user.name
    const messageDate = message.created_at
    const messageDateFormatted = parseISO(messageDate)
    const currentDateTime = (new Date()).toLocaleString();
    const curDateTime = currentDateTime.split(", ")
    const messageDateTime = messageDateFormatted.toLocaleString() // 11/17/2021, 6:31:47 PM
    const msgDateTime = messageDateTime.split(", ")
    const renderDate = curDateTime[0] === msgDateTime[0] ? msgDateTime[1] : msgDateTime[0]


    return (
        <div>
            {message.user.id === userInfo.id ? 
            <UserSpan>{content} by me at {renderDate}</UserSpan>
            : 
            <OtherSpan>{content} by {name} at {renderDate} <Avatar name={name} round={true} size="25" /> </OtherSpan>}<Avatar name={name} round={true} size="25" className="chat-avatar"/>
        {/* <span>{content} by {name} at {renderDate} </span> */}
        </div>
    )
}

const UserSpan = styled.span`
    display: flex;
    justify-content: flex-end;
`

const OtherSpan = styled.span`

`

export default Message
