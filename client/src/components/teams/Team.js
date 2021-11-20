import React from 'react'
import styled from 'styled-components'

import { Switch, Route, Link, useParams } from 'react-router-dom';
import {messagesSelectors} from '../../states/messagesSlice'
import { useSelector } from 'react-redux'
import {membershipsSelectors} from '../../states/membershipsSlice'
import Avatar from 'react-avatar';
import AvatarGroup from 'react-avatar-group'

const Team = ({team, membership}) => {
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === team.id)
    const userInfo = useSelector(state => state.usersInfo)
    if (!messages || !membership) {
        return <h1>Loading..</h1>
    } 
    const lastRead = membership.last_read_at
    const unreadMessages = messages.filter(message => message.created_at > lastRead)
    const currentID = parseInt(window.location.href.split("/").at(-1))

    const usersToRender = team.users?.filter(user => user.id !== userInfo.id)
    const namesToRender = usersToRender.map(user => user.name)
    let names = namesToRender.join(' ').slice(0,12)
    if (namesToRender.join(' ').length > 12) {
        names += '...'
    }

    return (
        <LinkTeam to={`/teams/${team.id}`}>
            <FirstDiv>
                <AvatarGroup
                    avatars={namesToRender}
                    initialCharacters={1}
                    max={1}
                    size={30}
                    //displayAllOnHover
                    shadow={2}
                    />
            </FirstDiv>
            <SecondDiv>
                <span>{names}</span>
                {messages.length ? 
                <span>{messages.at(-1).content.length < 10 ? messages.at(-1).content : messages.at(-1).content.substring(0,10) + "..."}</span>
                : null}
            </SecondDiv>
                {/* {unreadMessages.length > 0 && currentID !== team.id ? <ThirdDiv><UnreadSpan></UnreadSpan></ThirdDiv>: null} */}
            {/* <span>{team.name}</span> */}
        </LinkTeam>
    )
}

const UnreadSpan = styled.div`
    // background-color: red;
    // border-radius: 50%;
    // width: 10%;
    // padding: 4px;
    // text-align: center;
`

const FirstDiv = styled.div.attrs(props => ({
    className: 'firstDiv'
}))`
    margin-left: 0.3vw;
    margin-right: 1vw;
`

const SecondDiv = styled.div.attrs(props => ({
    className: 'secondDiv'
}))`
    display: flex;
    flex-direction: column;
    width: 100%;

`

const ThirdDiv = styled.div.attrs(props => ({
    className: 'ThirdDiv'
}))`
    background-color: #d6a2a2;
    border-radius: 50%;
    width: 1%;
    padding: 4px;
    text-align: center;
`

const LinkTeam = styled(Link)`
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: 8vh;
    width: 12vw;
    box-shadow: 0px 1px 2px 3px rgb(132 133 132 / 40%);
    //box-shadow: 0 0px 0px rgb(0 0 0 / 15%);
    background-color: white;
    margin-bottom: 20px;
    border-radius: 10px;
    text-decoration: none;
    &:focus, &:hover, &:visited, &:link, &:active {
        text-decoration: none;
    }
`

export default Team
