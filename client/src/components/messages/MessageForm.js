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
            <ChatForm onSubmit={handleSubmit}>
                <input 
                className="ChatInput" 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Message..."/>
                <button type="submit" disabled={chatInput? false:true}>Send</button>
            </ChatForm>
        </>
    )
}


const ChatForm = styled.form`
    .ChatInput {
        position: relative
        width: 50%;
        max-width: none;
        bottom: 50px;
        
        
        
    }

`

export default MessageForm
