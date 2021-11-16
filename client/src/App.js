import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MessagesList from './components/MessagesList';
import TeamListItem from './components/TeamListItem'
import TeamList from './components/teams/TeamList';

function App() {
  const [ teams, setTeams] = useState([])

  useEffect(()=> {
    fetch("http://localhost:3000/teams")
    .then(resp => resp.json())
    .then((data) => setTeams(data))
  }, [])

  return (
    <Router>
      <TeamList />
      {teams.map(team => <TeamListItem key={team.id} team={team}/>)}
      <Switch>
        <div className="App">
          <Route path="/:team_id">
            <MessagesList />
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
