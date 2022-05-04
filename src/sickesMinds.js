import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { App } from "./App"
import { NavBar } from "./components/nav/Nav"
import { Login } from "./components/auth/login"
import { Register } from "./components/auth/register"
import { DataProvider } from "./components/data/DataProvider"

export const SickestMinds = () => (
    <>
        <Route render={(props) => {
            if (localStorage.getItem("local_user")) {
                return <>
                    <DataProvider>
                        <NavBar {...props} />
                        <App />
                    </DataProvider>
                </>
            } else {
                return <Redirect to="/login" />
            }
        }} />
        
        <Route path="/login" render={(props) => <Login {...props} />} />
        <Route path="/register" render={(props) => <Register {...props} />} />
    </>
)