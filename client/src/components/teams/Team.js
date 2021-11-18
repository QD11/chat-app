import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom';
import {messagesSelectors} from '../../states/messagesSlice'
import { useSelector } from 'react-redux'

const Team = ({team}) => {
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === team.id)

    return (
        <LinkTeam to={`/teams/${team.id}`}>
            <span>{team.name}</span>
            <span>{team.users.map(user => user.name)}</span>
            {messages.length? <span>{messages.at(-1).content.length < 8 ? messages.at(-1).content : messages.at(-1).content.substring(0,8) + "..."}</span> : null}
        </LinkTeam>
    )
}

const LinkTeam = styled(Link)`
    display: flex;
    flex-direction: column;
    width: 100%;
    // box-shadow: 1px 1px 5px 3px rgb(132 133 132 / 40%);
    // background-color: white;
    margin-bottom: 20px;
    border-radius: 10px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export default Team
