import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/details';
import Login from './components/Login/Login'

const routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={MovieDetails} />
            <Route path="/login" exact component={Login} />
        </Switch>
    )
}

export default routes;
