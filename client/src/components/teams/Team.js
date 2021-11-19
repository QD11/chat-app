import React from 'react'
import styled from 'styled-components'

import { Switch, Route, Link, useParams } from 'react-router-dom';
import {messagesSelectors} from '../../states/messagesSlice'
import { useSelector } from 'react-redux'
import {membershipsSelectors} from '../../states/membershipsSlice'

const Team = ({team, membership}) => {
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === team.id)
    const userInfo = useSelector(state => state.usersInfo)
    if (!messages) {
        return <h1>Loading..</h1>
    } 
    const lastRead = membership.last_read_at
    const unreadMessages = messages.filter(message => message.created_at > lastRead)
    const currentID = parseInt(window.location.href.split("/").at(-1))

    const usersToRender = team.users?.filter(user => user.id !== userInfo.id)
    const namesToRender = usersToRender.map(user => user.name)
    let names = namesToRender.join(' ').slice(0,10)
    if (namesToRender.join(' ').length > 10) {
        names += '...'
    }
    console.log(names)

    return (
        <LinkTeam to={`/teams/${team.id}`}>
            <FirstDiv>
                pic
            </FirstDiv>
            <SecondDiv>
                <span>{names}</span>
                {messages.length ? 
                <span>{messages.at(-1).content.length < 8 ? messages.at(-1).content : messages.at(-1).content.substring(0,8) + "..."}</span>
                : null}
            </SecondDiv>
            <ThirdDiv>
                {unreadMessages.length > 0 && currentID !== team.id ? <span>{unreadMessages.length}</span>: <span>#</span>}
            </ThirdDiv>
            {/* <span>{team.name}</span> */}
        </LinkTeam>
    )
}

const FirstDiv = styled.div.attrs(props => ({
    className: 'firstDiv'
}))`
    margin-left: 1vw;
    margin-right: 1vw;
`

const SecondDiv = styled.div.attrs(props => ({
    className: 'secondDiv'
}))`
    display: flex;
    flex-direction: column;
    width: 50%;

`

const ThirdDiv = styled.div.attrs(props => ({
    className: 'ThirdDiv'
}))`

`

const LinkTeam = styled(Link)`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 8vh;
    width: 12vw;
    //box-shadow: 1px 1px 5px 3px rgb(132 133 132 / 40%);
    background-color: white;
    margin-bottom: 20px;
    border-radius: 10px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export default Team
