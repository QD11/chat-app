import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './states/usersSlice'
import TeamLayout from './components/teams/TeamLayout'
import SignupForm from './components/homepage/SignupForm'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  // const dispatch = useDispatch()
  const [image, setImage] = useState("")
  const user = useSelector(state => state.usersInfo)

  // useEffect(() => {
  //   // auto-login
  //   fetch("/me").then((r) => {
  //     if (r.ok) {
  //       r.json().then((user) => dispatch(getUser(user)));
  //       //history.push('/teams')
  //     }
  //   });
  // }, []);

    // if (!user) return <Login setUser={setUser} />;
  return (
    <Router>
      
      <Switch>
        <Route path='/teams' >
          {user  ? 
            <>
              <Navbar image={image} setImage={setImage}/> 
              <TeamLayout  path='/teams' image={image} setImage={setImage}/>
            </>
            : null}
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
