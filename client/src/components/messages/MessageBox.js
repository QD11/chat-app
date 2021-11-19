import React from 'react'
import { Switch, Route, useParams} from 'react-router-dom';
import MessageTeam from './MessageTeam'
import CreateTeam from '../teams/CreateTeam'
import styled from 'styled-components'
import TeamMembers from '../teams/TeamMembers'

const MessageBox = ({path, image, setImage}) => {

    const abc = useParams()

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
                    <MidSideDiv>
                        <MessageTeam />
                    </MidSideDiv>
                    <RightSideDiv>
                        <TeamMembers image={image} setImage={setImage}/>
                    </RightSideDiv>
                </Route>
            </Switch>
        </>
    )
}

const RightSideDiv = styled.div.attrs(props => ({
    className: 'RightSideDiv'
}))`
    
`

const MidSideDiv = styled.div.attrs(props => ({
    className: 'MidSideDiv'
}))`
    width: 65%;
    bottom: 10;
`

export default MessageBox
