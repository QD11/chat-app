import React, {useState} from 'react'
import { useEffect } from 'react/cjs/react.development'
import styled from 'styled-components'

const MessageForm = ({sendMessage, team_id}) => {
    const [chatInput, setChatInput] = useState("")

    useEffect(() => {
        setChatInput("")
    }, [team_id])

    const handleSubmit = (e) => {
        e.preventDefault()
        sendMessage(chatInput)
        setChatInput("")
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
