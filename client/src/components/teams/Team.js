import React from 'react'
import styled from 'styled-components'
import { Switch, Route, Link } from 'react-router-dom';

const Team = ({team}) => {

    console.log(team)

    return (
        <LinkTeam to={`/teams/${team.id}`}>
            <span>{team.name}</span>
            <span>{team.memberships.map(member => member.user.name)}</span>
            <span>{team.latest_message.content.length < 8 ? team.latest_message.content : team.latest_message.content.substring(0,8) + "..."}</span>
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
