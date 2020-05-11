import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'

import {AuthPage}       from './pages/AuthPage'
import {NewsPage}       from './pages/NewsPage'
import {CreateNewPage}  from './pages/CreateNewPage'

export const useRouts = isAutentification => {
    if(!isAutentification){
        return(
            <Switch>
                <Route path="/news">
                    <NewsPage />
                </Route>
                <Route path="/create">
                    <CreateNewPage />
                </Route>
                <Redirect to="/news" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact>
                <AuthPage />
            </Route>
            <Redirect to="/" />
        </Switch>
    )
}