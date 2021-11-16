import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { useDispatch } from 'react-redux'
import { getData } from './states/teamsSlice'

import MessagesList from './components/MessagesList';
import TeamListItem from './components/TeamListItem'

import TeamList from './components/teams/TeamList';
import TeamLayout from './components/teams/TeamLayout'
import SignupForm from './components/homepage/SignupForm'
import Login from './pages/Login'

function App() {
  const [user, setUser] = useState(null);

  // useEffect(() => {
  //   // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => setUser(user));
  //     }
  //   });
  // }, []);

    // if (!user) return <Login setUser={setUser} />;
  return (
    <Router>
      <Switch>
        <Route path='/teams' >
          <TeamLayout path='/teams' />
        </Route>
        <Route path='/signup'>
          <SignupForm />
        </Route>
        <Route path ="/">
          <Login/>
        </Route>
      </Switch>
    
      {/* <TeamList /> */}

      {/* {teams.map(team => <TeamListItem key={team.id} team={team}/>)}

      <Switch>
        <div className="App">
          <Route path="/:team_id">
            <MessagesList />
          </Route>
          <Route path="/new">
            <Login/>
          </Route>
        </div>
      </Switch> */}
    </Router>
  );
}

export default App;
