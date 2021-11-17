import React from 'react'
import {useSelector} from 'react-redux'
import styled from 'styled-components'

const Message = ({message}) => {
    const userInfo = useSelector(state => state.usersInfo)
    const date = (new Date()).toISOString().split('T')[0]
    const content = message.content
    const name = message.user.name
    const messageDate = message.created_at
    
    //work on getting local time
    const renderDate = (date === messageDate.slice(0,10)) ? 
        convert(messageDate.slice(12,19)):
        messageDate.slice(5,7) + '/' + messageDate.slice(8,10) + '/' +messageDate.slice(0,4)

    return (
        <div>
            {message.user.id === userInfo.id ? 
            <UserSpan>{content} by me at {renderDate}</UserSpan>
            : 
            <OtherSpan>{content} by {name} at {renderDate}</OtherSpan>}
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


function convert(input) {
    const time = input.split(':'); // convert to array
    // fetch
    const hours = Number(time[0]);
    const minutes = Number(time[1]);
    const seconds = Number(time[2]);
    // calculate
    let timeValue;

    if (hours > 0 && hours <= 12) {
        timeValue= "" + hours;
        } else if (hours > 12) {
        timeValue= "" + (hours - 12);
        } else if (hours == 0) {
        timeValue= "12";
    }
    
    timeValue += (minutes < 10) ? ":0" + minutes : ":" + minutes;  // get minutes
    timeValue += (seconds < 10) ? ":0" + seconds : ":" + seconds;  // get seconds
    timeValue += (hours >= 12) ? " P.M." : " A.M.";  // get AM/PM
    return timeValue
}

export default Message
