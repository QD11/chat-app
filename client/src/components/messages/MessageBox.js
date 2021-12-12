import React from 'react'
import { Switch, Route, useParams} from 'react-router-dom';
import MessageTeam from './MessageTeam'
import CreateTeam from '../teams/CreateTeam'
import styled from 'styled-components'
import TeamMembers from '../teams/TeamMembers'
import {useSelector} from 'react-redux'

import { teamsSelectors, updateTeam } from '../../states/teamsSlice'
import { messagesSelectors, addMessage } from '../../states/messagesSlice'
import { setMembership } from '../../states/membershipsSlice'

const MessageBox = ({path, image, setImage}) => {
    const {team_id} = useParams()
    const userInfo = useSelector(state => state.usersInfo)
    const messages = useSelector(messagesSelectors.selectAll).filter(message => message.team.id === parseInt(team_id))
    const teamsInfo = useSelector(teamsSelectors.selectAll)

    console.log(teamsInfo)

    return (
        <>
            <Switch>
                //create new teams
                <Route exact path={`${path}/create`}>
                    <MidSideDiv>
                        < CreateTeam/>
                    </MidSideDiv>
                </Route>
                
                //render teams
                <Route path={`${path}/:team_id`} >
                    {teamsInfo.ids.length ?  
                    <>
                        <MidSideDiv>
                            <MessageTeam />
                        </MidSideDiv>
                        <RightSideDiv>
                            <TeamMembers image={image} setImage={setImage}/>
                        </RightSideDiv>
                    </>
                    : null
                    }
                </Route>
            </Switch>
        </>
    )
}

const RightSideDiv = styled.div.attrs(props => ({
    className: 'RightSideDiv'
}))`
    background-color: #dfe8f0;
    display: flex;
    justify-content: center;
    width: 25%;
    overflow: scroll;
    ::-webkit-scrollbar {
        width: 0;  /* Remove scrollbar space */
        background: transparent;  /* Optional: just make scrollbar invisible */
    }
`

const MidSideDiv = styled.div.attrs(props => ({
    className: 'MidSideDiv'
}))`
    display: flex;
    flex-direction: column;
    height: 92vh;
    width: 60%;
`

export default MessageBox
