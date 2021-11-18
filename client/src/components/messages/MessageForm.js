import React, {useState} from 'react'
import styled from 'styled-components'

const MessageForm = ({sendMessage}) => {
    const [chatInput, setChatInput] = useState("")

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(chatInput)
    }

    return (
        <>
            <ChatForm className="message-form" onSubmit={handleSubmit}>
                <input 
                className="ChatInput" 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message...">

                </input>
                <button type="submit" disabled={chatInput? false:true}>Submit</button>
            </ChatForm>
        </>
    )
}


const ChatForm = styled.form`
    .ChatInput {
        width: 100%;
        max-width: none;
    }
`

export default MessageForm
