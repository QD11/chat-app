import React, {useEffect} from 'react'
import TeamList from './TeamList';
import TeamMembers from './TeamMembers';
import MessageBox from '../messages/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { getTeams } from '../../states/teamsSlice'
import { getMessagesPerTeam} from '../../states/messagesPerTeamSlice'
import { Switch, Route, Link } from 'react-router-dom';
import { getMessages, messagesSelectors } from '../../states/messagesSlice';
import styled from 'styled-components'

const TeamLayout = ({path, image, setImage}) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)

    useEffect(()=> {
        fetch(`http://localhost:3000/${userInfo.id}/teams`)
        .then(resp => resp.json())
        .then((data) => dispatch(getTeams(data)))

        fetch(`http://localhost:3000/${userInfo.id}/teams/messages`)
        .then(resp => resp.json())
        .then((data) => dispatch(getMessages(data)))
    }, [userInfo])

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
                    <MidSideDiv>
                        <MessageBox path={path}/>
                    </MidSideDiv>
                    <RightSideDiv>                       
                        <TeamMembers image={image} setImage={setImage}/>
                    </RightSideDiv>
                </Route>
            </Switch>
            
        </SplitDiv>
    )
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
