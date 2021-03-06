import React, {useState, useEffect} from 'react'
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
                        onChange={e => setChatInput(e.target.value)}
                        placeholder="Message..."
                    />
                    <button type="submit" disabled={chatInput? false:true}>Send</button>
            </ChatForm>
        </>
    )
}


const ChatForm = styled.form`
    // max-height: 10%;
    padding-top: 5px;
    padding-bottom: 0px;
    .ChatInput {
        position: relative
        width: 80%;
        max-width: none;
        bottom: 50px;
        margin-right: 10px;
    }

`

export default MessageForm
