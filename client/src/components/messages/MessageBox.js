import React from 'react'
import { Switch, Route } from 'react-router-dom';
import MessageTeam from './MessageTeam'

const MessageBox = ({path}) => {
    return (
        <>
            <Switch>
                //create new teams
                <Route exact path={`${path}/create`}>
                    <h1>bye</h1>
                </Route>
                //render teams
                <Route path={`${path}/:team_id`}>
                    <MessageTeam />
                </Route>
            </Switch>
        </>
    )
}

export default MessageBox
