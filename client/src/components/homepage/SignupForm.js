import React, { useState } from 'react'
import {useHistory} from "react-router-dom";


function SignupForm() {
const history = useHistory()
const [name, setName] = useState("");

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
// const [passwordConfirmation, setPasswordConfirmation] = useState("");
const [errors, setErrors] = useState([]);
const [isLoading, setIsLoading] = useState(false);

function handleSubmit(e) {
  e.preventDefault();
  setErrors([]);
  setIsLoading(true);
  fetch("/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name,  
      email,
      password,
    //   password_confirmation: passwordConfirmation,
    }),
  }).then((r) => {
    setIsLoading(false);
    if (r.ok) {
      r.json().then((user) => console.log(user));
    } else {
      r.json().then((err) => setErrors(err.errors));
    }
  });
}

return (
  <div>
    <form onSubmit={handleSubmit}>
      
        <label htmlFor="name">Full Name</label>
        <input
          type="text"
          id="name"
          autoComplete="off"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="email">Email</label>
        <input
          type="text"
          id="email"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="current-password"
        />

        {/* <label htmlFor="password">Password Confirmation</label>
        <input
          type="password"
          id="password_confirmation"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          autoComplete="current-password"
        /><br/> */}
        <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>

        {/* {errors.map((err) => (
          <error key={err}>{err}</error>
        ))} */}

    </form>
    <button onClick={() => history.push('/')}>Cancel</button>
  </div>
);

}

export default SignupForm;
