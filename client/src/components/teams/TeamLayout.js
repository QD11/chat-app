import React, { useEffect, useContext } from 'react'
import TeamList from './TeamList';
import MessageBox from '../messages/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams, addTeam, fetchTeams, teamsSelectors } from '../../states/teamsSlice'
import { Switch, Route, Link } from 'react-router-dom';
import { getMessages, fetchMessages, messagesSelectors, addMessage} from '../../states/messagesSlice';
import {fetchAllUsers, allUsersSelectors} from '../../states/allusersSlice'
import styled from 'styled-components'
import { ActionCableContext } from '../../index'
import { getMemberships, fetchMemberships, membershipsSelectors, addMembership } from '../../states/membershipsSlice'
import {BiMessageAdd} from 'react-icons/bi'

const TeamLayout = ({path, image, setImage}) => {
    const cable = useContext(ActionCableContext)
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)
    const teams = useSelector(teamsSelectors.selectAll)
    const messages = useSelector(messagesSelectors.selectAll)
    const memberships = useSelector(membershipsSelectors.selectAll)
    const allUsersInfo = useSelector(allUsersSelectors.selectAll)

    useEffect(()=> {
        dispatch(fetchTeams(`http://localhost:3000/${userInfo.id}/teams`))
        dispatch(fetchMessages(`http://localhost:3000/${userInfo.id}/teams/messages`))
        dispatch(fetchMemberships(`http://localhost:3000/${userInfo.id}/memberships`))
        dispatch(fetchAllUsers("http://localhost:3000/users"))

        cable.subscriptions.create({
            channel: 'NewTeamChannel'
        },
        {
            received: (data) => {
                if (data.users.find(user => user.id === userInfo.id)) {
                    dispatch(addTeam(data))
                }}
        })

        cable.subscriptions.create({
            channel: 'NewMessageChannel'
        },
        {
            received: (data) => {
                dispatch(addMessage(data))
            }
        })

        cable.subscriptions.create({
            channel: 'NewMembershipChannel'
        },
        {
            received: (data) => {
                dispatch(addMembership(data))
            }
        })
    }, [userInfo, dispatch])


    if (teams.length > 0 && memberships.length > 0 &&  messages.length > 0 && allUsersInfo.length > 0) {
        
        return (
            <SplitDiv>
                <LeftSideDiv>
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

const NewMessage = styled(BiMessageAdd)`
    font-size: 75px;
    margin-left: 15px;
    cursor: pointer;
`

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
    overflow-y: scroll;
    height: 92vh;
    background-color: #dfe8f0;
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
