import React, {useEffect, useState} from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { getUser } from './states/usersSlice'
import TeamLayout from './components/teams/TeamLayout'
import SignupForm from './components/homepage/SignupForm'
import Login from './pages/Login'
import Navbar from './components/Navbar'

function App() {
  const history = useHistory()
  const dispatch = useDispatch()
  const [image, setImage] = useState("")
  const user = useSelector(state => state.usersInfo)

  useEffect(() => {
    // auto-login
    fetch("/me")
    .then((r) => {
      if (r.ok) {
        r.json()
        .then((user) => {
          console.log(user)
          dispatch(getUser(user))
          history.push('/team')
        });
      }
    });
  }, []);
  

  // if (!user) return <Login />;
  // if (Object.keys(user).length === 0) {
  //   history.push('/')
  // }


  return (
    <Router>
      <Switch>
        <Route path='/team' >
          {Object.keys(user).length !== 0  ? 
            <>
              <Navbar image={image} setImage={setImage}/> 
              <TeamLayout path='/team' image={image} setImage={setImage} />
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
    </Router>
  );
}

export default App;
