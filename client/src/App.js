import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { getData } from './states/teamsSlice'

import MessagesList from './components/MessagesList';
import TeamListItem from './components/TeamListItem'
import TeamList from './components/teams/TeamList';
import TeamLayout from './components/teams/TeamLayout'

function App() {

  return (
    <Router>
      <Switch>
        <Route path='/teams' >
          <TeamLayout path='/teams' />
        </Route>
      </Switch>
      {/* <TeamList /> */}

      {/* {teams.map(team => <TeamListItem key={team.id} team={team}/>)}

      <Switch>
        <div className="App">
          <Route path="/:team_id">
            <MessagesList />
          </Route>
        </div>
      </Switch> */}
    </Router>
  );
}

export default App;
