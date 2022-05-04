import React, { useRef } from "react"
import { Button } from 'react-bootstrap'
import "./login.css"
import sickestMinds from "../sickestMinds.jpg";

export const Register = (props) => {
  const firstName = useRef()
  const lastName = useRef()
  const email = useRef()
  const password = useRef()
  const verifyPassword = useRef()
  const passwordDialog = useRef()

  const existingUserCheck = () => {
    return fetch(`http://localhost:8080/users?email=${email.current.value}`)
      .then(_ => _.json())
      .then(user => !!user.length)
  }

  const handleRegister = (e) => {
    e.preventDefault()

    if (password.current.value === verifyPassword.current.value) {
      existingUserCheck()
        .then(() => {
          fetch("http://localhost:8080/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              email: email.current.value,
              password: password.current.value,
              name: `${firstName.current.value} ${lastName.current.value}`
            })
          })
            .then(_ => _.json())
            .then(createdUser => {
              if (createdUser.hasOwnProperty("id")) {
                localStorage.setItem("local_user", createdUser.id)
                props.history.push("/home")
              }
            })
        })
    } else {
      passwordDialog.current.showModal()
    }
  }

  return (
    <main style={{ textAlign: "center" }}>
      <style type="text/css">
        {`.navbar {display: none}`}
      </style>
      <dialog className="dialog dialog--password" ref={passwordDialog}>
        <div>Passwords do not match</div>
        <Button className="button--close" onClick={e => passwordDialog.current.close()}>Close</Button>
      </dialog>
      <form className="form--login" onSubmit={handleRegister}>
        <img className="registerImage" src={sickestMinds}></img>
        <fieldset>
          <label className="emailLabel" htmlFor="firstName"> First Name </label>
          <input ref={firstName} type="text"
            name="firstName"
            className="form-control"
            placeholder="First name"
            required autoFocus />
        </fieldset>
        <fieldset>
          <label className="emailLabel" htmlFor="lastName"> Last Name </label>
          <input ref={lastName} type="text"
            name="lastName"
            className="form-control"
            placeholder="Last name"
            required />
        </fieldset>
        <fieldset>
          <label className="emailLabel" htmlFor="inputEmail"> Email address </label>
          <input ref={email} type="email"
            name="email"
            className="form-control"
            placeholder="Email address"
            required />
        </fieldset>
        <fieldset>
          <label className="emailLabel" htmlFor="inputPassword"> Password </label>
          <input ref={password} type="password"
            name="password"
            className="form-control"
            placeholder="Password"
            required />
        </fieldset>
        <fieldset>
          <label className="emailLabel" htmlFor="verifyPassword"> Verify Password </label>
          <input ref={verifyPassword} type="password"
            name="verifyPassword"
            className="form-control"
            placeholder="Verify password"
            required />
        </fieldset>
        <fieldset>
          <Button className="emailLabel" variant='primary' type="submit">
            Sign in
          </Button>
        </fieldset>
      </form>
    </main>
  )
}