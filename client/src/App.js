import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MessagesList from './components/MessagesList';
import TeamListItem from './components/TeamListItem'
import Login from './pages/Login'

function App() {
  const [ teams, setTeams] = useState([])
  const [user, setUser] = useState(null);

  useEffect(()=> {
    fetch("http://localhost:3000/teams")
    .then(resp => resp.json())
    .then((data) => setTeams(data))
  }, [])
  

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    });
  }, []);

   if (!user) return <Login setUser={setUser} />;
  return (
    <Router>
      {teams.map(team => <TeamListItem key={team.id} team={team}/>)}
      <Switch>
        <div className="App">
          <Route path="/:team_id">
            <MessagesList />
          </Route>
          <Route path="/new">
            <Login/>
          </Route>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
