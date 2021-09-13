import React, { useRef } from 'react'
import { Container, Button, Form } from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'

import './login.css'

export const Login = (props) => {
    
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()
    const history = useHistory()

    const existingUserCheck = () => {
        return fetch(`http://localhost:8080/users?email=${email.current.value}`)
            .then((_) => _.json())
            .then((user) => (user.length ? user[0] : false))
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck().then((exists) => {
            if (exists && exists.password === password.current.value) {
                localStorage.setItem('local_user', exists.id)
                history.push('/home')
            } else if (exists && exists.password !== password.current.value) {
                passwordDialog.current.showModal()
            } else if (!exists) {
                existDialog.current.showModal()
            }
        })
    }

    return <>
        <style type="text/css">
            {`.navbar {display: none}`}
        </style>
        <Container className="container--login">
            <dialog className="dialog dialog--auth" ref={existDialog}>
                <div>User does not exist</div>
                <Button className=" pt-2 button--close" onClick={(e) => existDialog.current.close()}>
                    Close
                </Button>
            </dialog>
            <dialog className="dialog dialog--password" ref={passwordDialog}>
                <div className="pb-1">Password does not match</div>
                <Button className="button--close" onClick={(e) => passwordDialog.current.close()}>
                    Close
                </Button>
            </dialog>
            <section>
                <Form className="form--login" onSubmit={handleLogin}>
                    <fieldset>
                        <label className="emailLabel" htmlFor="inputEmail">Email address </label>
                        <input
                            ref={email}
                            type="email"
                            id="email"
                            defaultValue="dylanthk@gmail.com"
                            className="form-control"
                            placeholder="Email address"
                            required
                            autoFocus
                        />
                    </fieldset>
                    <fieldset>
                        <label className="emailLabel" htmlFor="inputPassword"> Password </label>
                        <input ref={password} type="password" id="password" defaultValue="" className="form-control" placeholder="Password" required />
                    </fieldset>
                    <fieldset className="d-flex justify-content-center">
                        <Button  id="btn-login" type="submit">Sign in</Button>
                    </fieldset>
                </Form>
            </section>
            <section className="link--register">
                <Link className="text-white" to="/register">Not a member yet?</Link>
            </section>
        </Container>
    </>
}