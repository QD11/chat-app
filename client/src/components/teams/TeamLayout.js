import React, {useEffect} from 'react'
import TeamList from './TeamList';
import MessageBox from '../messages/MessageBox'
import { useDispatch, useSelector } from 'react-redux'
import { getData } from '../../states/teamsSlice'
import { getMessagesPerTeam} from '../../states/messagesPerTeamSlice'
import { Switch, Route, Link } from 'react-router-dom';
import styled from 'styled-components'

const TeamLayout = ({path}) => {
    const dispatch = useDispatch()
    const userInfo = useSelector(state => state.usersInfo)

    useEffect(()=> {
        fetch(`http://localhost:3000/${userInfo.id}/teams`)
        .then(resp => resp.json())
        .then((data) => dispatch(getData(data)))

        fetch(`http://localhost:3000/${userInfo.id}/teams/all`)
        .then(resp => resp.json())
        .then((data) => dispatch(getMessagesPerTeam(data)))
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
                <MidSideDiv>
                    <Route path={`${path}/:team_id`}>
                        <MessageBox path={path}/>
                    </Route>
                </MidSideDiv>
                {/* //create new teams
                <Route exact path={`${path}/create`}>
                    <h1>bye</h1>
                </Route>
                //render teams
                <Route path={`${path}/:team_id`}>
                    <h1>hi</h1>
                </Route> */}
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
