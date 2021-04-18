import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './components/Home/home';
import MovieDetails from './components/MovieDetails/details';
import Login from './components/Login/Login'
import Register from './components/Register/Register'
import CreateReview from './components/CreateReview/createReview'
import CreateCinema from './components/Admin/CreateCinema/createCinema'
import CreateShowtime from './components/Admin/CreateShowtime/createShowtime'
import Dashboard from './components/Admin/Dashboard/dashboard'
import CinemasList from './components/Admin/Cinemas/cinemas'
import AddMovie from './components/Admin/AddMovie/addMovie'
import Showtimes from './components/Admin/CreateShowtime/showtimes'


const routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Dashboard} />
            <Route path="/home" exact component={Home} />
            <Route path="/movie/:movieId" exact component={MovieDetails} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/create-review" exact component={CreateReview} />
            <Route path="/create-cinema" exact component={CreateCinema} />
            <Route path="/create-showtime/:cinemaId" exact component={CreateShowtime} />
            <Route path="/addMovie/:cinemaId" exact component={AddMovie} />
            <Route path="/showtimes" exact component={Showtimes} />
            <Route path="/admin-cinemas" exact component={CinemasList} />
            <Route component={() => (<h1 className="heading m-5">404 Page Not Found</h1>)} />

        </Switch>
    )
}

export default routes;
