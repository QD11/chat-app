import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link, useParams } from 'react-router-dom';
import {messagesSelectors} from '../../states/messagesSlice'
import { useSelector } from 'react-redux'
import {membershipsSelectors} from '../../states/membershipsSlice'

const Team = ({team, membership}) => {
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === team.id)
    const lastRead = membership.last_read_at
    const unreadMessages = messages.filter(message => message.created_at > lastRead)
    const currentID = parseInt(window.location.href.split("/").at(-1))

    return (
        <LinkTeam to={`/teams/${team.id}`}>
            {unreadMessages.length > 0 && currentID !== team.id ? <span>{unreadMessages.length}</span>: null}
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
