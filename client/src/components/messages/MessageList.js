import React from 'react'
import Message from './Message'

const MessageList = ({messages}) => {
    // const nonEmptyMessages = messages.map(message => message.content !== "")
    return (
        <div>
            {messages.map(message => <Message key={message.id} message={message}/>)}
        </div>
    )
}

export default MessageList
