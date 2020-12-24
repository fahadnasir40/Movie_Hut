import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/details';

const routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={MovieDetails} />
        </Switch>
    )
}

export default routes;
