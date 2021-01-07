import React from 'react';
import { Switch, Route } from 'react-router-dom';
import MovieDetails from './components/MovieDetails/details';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateReview from './components/CreateReview/CreateReview'


const routes = () => {

    return (
        <Switch>
            <Route path="/" exact component={MovieDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/create-review" exact component={CreateReview} />
        </Switch>
    )
}

export default routes;
