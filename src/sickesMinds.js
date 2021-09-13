import React from "react"
import { Route, Redirect, Switch } from "react-router-dom"
import { App } from "./App"
import { NavBar } from "./components/Nav"
import { Login } from "./components/login"
import { Register } from "./components/register"
import { DataProvider } from "./components/DataProvider"

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