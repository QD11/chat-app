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
    margin: 0 0 5px;
    padding: 0.5em 1em 0.65em;
    border-radius: 4px;
    max-width: 65%;
    clear: both;
    position: relative;
    float: right;
    background-color: #1289fe;
    color: white;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    border-bottom-right-radius: 1em 0.5em;
    border-bottom-left-radius: 1em;

`

const OtherSpan = styled.span`
    display: flex;
    justify-content: flex-end;
    margin: 0 0 5px;
    padding: 0.5em 1em 0.65em;
    border-radius: 4px;   
    max-width: 65%;
    clear: both;
    position: relative;
    float: left;
    background-color: #e5e5ea;
    color: black;
    border-top-left-radius: 1em;
    border-top-right-radius: 1em;
    border-bottom-left-radius: 1em 0.5em;
    border-bottom-right-radius: 1em;
  

`

export default Message
