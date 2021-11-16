import React, { useState } from 'react'

function SignupForm() {
const [firstName, setFirstName] = useState("");
const [lastName, setLastName] = useState("");
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [passwordConfirmation, setPasswordConfirmation] = useState("");
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
      firstName,
      lastName,  
      username,
      password,
      password_confirmation: passwordConfirmation,
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
  <form onSubmit={handleSubmit}>
    
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstname"
        autoComplete="off"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastname"
        autoComplete="off"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        autoComplete="off"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        autoComplete="current-password"
      />

      <label htmlFor="password">Password Confirmation</label>
      <input
        type="password"
        id="password_confirmation"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
        autoComplete="current-password"
      />
      <button type="submit">{isLoading ? "Loading..." : "Sign Up"}</button>

      {/* {errors.map((err) => (
        <error key={err}>{err}</error>
      ))} */}

  </form>
);

}

export default SignupForm;
