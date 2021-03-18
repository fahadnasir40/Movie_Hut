import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import MovieDetails from './components/MovieDetails/details';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateReview from './components/CreateReview/CreateReview'
import CreateCinema from './components/CreateCinema/CreateCinema'
import CreateShowtime from './components/CreateShowtime/CreateShowtime'

const routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/movie" exact component={MovieDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/create-review" exact component={CreateReview} />
            <Route path="/create-cinema" exact component={CreateCinema} />
            <Route path="/create-showtime" exact component={CreateShowtime} />
            <Route component={() => (<h1 className="heading m-5">404 Page Not Found</h1>)} />

        </Switch>
    )
}

export default routes;
