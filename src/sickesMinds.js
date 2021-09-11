import React from "react"
import { Route, Redirect } from "react-router-dom"
import { App } from "./App"
import { NavBar } from "./components/Nav"
import { Login } from "./components/login"
import { Register } from "./components/register"
import { DataProvider } from "./components/DataProvider"

export const SickestMinds = () => (
    <>
        <DataProvider>
            <Route render={(props) => {
                if (localStorage.getItem("local_user")) {
                    return <>
                        <NavBar {...props} />
                        <App />
                    </>
                } else {
                    return <Redirect to="/login" />
                }
            }} />

            <Route path="/login" render={() => {
                if (localStorage.getItem("local_user")) {
                    return <Redirect to="/home" />
                } else {
                    return <Login />
                }
            }} />

            <Route path="/register" render={(props) => {
                if (localStorage.getItem("local_user")) {
                    return <Redirect to="/home" />
                } else {
                    return <Register {...props} />
                }
            }} />
            <Route
                path="/logout"
                render={() => {
                    localStorage.removeItem("local_user");
                    <Redirect to="/login" />;
                    return <Login />
                }}
            />
        </DataProvider>
    </>
)