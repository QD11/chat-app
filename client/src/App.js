import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import { getUser } from './states/usersSlice'
import TeamLayout from './components/teams/TeamLayout'
import SignupForm from './components/homepage/SignupForm'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  const dispatch = useDispatch()
  const [memberImage, setMemberImage] = useState("")

  useEffect(() => {
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => dispatch(getUser(user)));
        //history.push('/teams')
      }
    });
  }, []);

    // if (!user) return <Login setUser={setUser} />;
  return (
    <Router>
      
      <Switch>
        <Route path='/teams' >
          <TeamLayout path='/teams' />
          <Navbar />
        </Route>
        <Route path='/signup'>
          <SignupForm />
        </Route>
        <Route path ="/">
          <Login />
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
