import React, {useEffect, useContext, useState} from 'react'
import TeamList from './TeamList';
import MessageBox from '../messages/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams, addTeam, fetchTeams, teamsSelectors } from '../../states/teamsSlice'
import { Switch, Route, Link } from 'react-router-dom';
import { getMessages, fetchMessages, messagesSelectors} from '../../states/messagesSlice';
import styled from 'styled-components'
import { ActionCableContext } from '../../index'
import { getMemberships, fetchMemberships, membershipsSelectors } from '../../states/membershipsSlice'

const TeamLayout = ({path, image, setImage}) => {
    const cable = useContext(ActionCableContext)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)

    const teams = useSelector(teamsSelectors.selectAll)
    const messages = useSelector(messagesSelectors.selectAll)
    const memberships = useSelector(membershipsSelectors.selectAll)

    useEffect(()=> {
        dispatch(fetchTeams(`http://localhost:3000/${userInfo.id}/teams`))
        dispatch(fetchMessages(`http://localhost:3000/${userInfo.id}/teams/messages`))
        dispatch(fetchMemberships(`http://localhost:3000/${userInfo.id}/memberships`))

        cable.subscriptions.create({
            channel: 'NewTeamChannel'
        },
        {
            received: (data) => {
                if (data.users.find(user => user.id === userInfo.id)) {
                    dispatch(addTeam(data))
                }}
        })
    }, [userInfo, dispatch])

    console.log(teams)

    if (teams.length > 0 && memberships.length > 0 &&  messages.length > 0) {
        
        return (
            <SplitDiv>
                <LeftSideDiv>
                    <LinkNewMessage to={`${path}/create`}>
                        <span>New Message</span>
                    </LinkNewMessage>
                    <TeamList />
                </LeftSideDiv>
                <Switch>
                    <Route path={`${path}/:team_id`}>
                        <MessageBox path={path} image={image} setImage={setImage}/>
                    </Route>
                </Switch>
            </SplitDiv>
        )
    } else {
        return null
    }
}

const SplitDiv = styled.div.attrs(props => ({
    className: 'SplitDiv'
}))`
    display: flex;
`

const LeftSideDiv = styled.div.attrs(props => ({
    className: 'LeftSideDiv'
}))`
    display: flex;
    flex-direction: column;
    width: 15%;
    align-items: center;
    
`

const MidSideDiv = styled.div.attrs(props => ({
    className: 'MidSideDiv'
}))`
    width: 65%;
`

const RightSideDiv = styled.div.attrs(props => ({
    className: 'RightSideDiv'
}))`
    width: 20%;
`

const LinkNewMessage = styled(Link)`
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

export default TeamLayout
