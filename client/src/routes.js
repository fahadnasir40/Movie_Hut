import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Auth from './hoc/auth';
import Home from './components/Home/home';
import Login from './components/Login/Login'
import Logout from './components/Logout/logout'
import Register from './components/Register/Register'
import MovieDetails from './components/MovieDetails/details';
import CreateReview from './components/Review/CreateReview/createReview'
import CreateCinema from './components/Admin/CreateCinema/CreateCinema'
import Promotions from './components/Admin/Promotions/promotions'
import CreateShowtime from './components/Admin/CreateShowtime/CreateShowtime'
import Dashboard from './components/Admin/Dashboard/dashboard'
import Favorites from './components/Favorites/favorites';
import CinemasList from './components/Admin/Cinemas/cinemas'
import AddMovie from './components/Admin/AddMovie/addMovie'
import Showtimes from './components/Admin/CreateShowtime/showtimes'
import Profile from './components/Profile/profile';
import UpdatePassword from './components/Profile/updatePassword';
import UpdateProfile from './components/Profile/edit';
import Settings from './components/Profile/settings'
import ForgotPassword from './components/Forgot/forgot';
import ResetPassword from './components/Reset/reset';
import ExpirePassword from './components/Reset/expiredPassword';
import Cinemas from './components/Home/cinemas';
import CinemaMovie from './components/Home/moviesInCinema';
import UsersList from './components/Admin/Users/users';
import ReportsList from './components/Admin/ReviewReports/reviewreports'

const routes = () => {
    return (
        <Switch>
            <Route path="/" exact component={Auth(Home, null)} />
            <Route path="/admin-panel" exact component={Auth(Dashboard, true, true)} />
            <Route path="/cinemas/:city?" exact component={Auth(Cinemas, null)} />
            <Route path="/movie/:movieId" exact component={Auth(MovieDetails, null)} />
            <Route path="/cinemaMovies/:cinemaId" exact component={Auth(CinemaMovie, null)} />
            <Route path="/login" exact component={Auth(Login, false)} />
            <Route path="/register" exact component={Auth(Register, false)} />
            <Route path="/forgot" exact component={Auth(ForgotPassword, false)} />
            <Route path="/reset/:id" exact component={Auth(ResetPassword, false)} />
            <Route path="/favorites" exact component={Auth(Favorites, true)} />
            <Route path="/profile" exact component={Auth(Profile, true)} />
            <Route path="/edit-profile" exact component={Auth(UpdateProfile, true)} />
            <Route path="/updatePassword" exact component={Auth(UpdatePassword, true)} />
            <Route path="/settings" exact component={Auth(Settings, true)} />
            <Route path="/create-review" exact component={Auth(CreateReview, true)} />
            <Route path="/create-cinema" exact component={Auth(CreateCinema, null, true)} />
            <Route path="/promotions" exact component={Auth(Promotions, true, true)} />
            <Route path="/create-showtime/:cinemaId" exact component={Auth(CreateShowtime, true, true)} />
            <Route path="/addMovie/:cinemaId" exact component={Auth(AddMovie, true, true)} />
            <Route path="/showtimes" exact component={Auth(Showtimes, true, true)} />
            <Route path="/admin-cinemas" exact component={Auth(CinemasList, true, true)} />
            <Route path="/admin-users" exact component={Auth(UsersList, true, true)} />
            <Route path="/admin-reports" exact component={Auth(ReportsList, true, true)} />
            <Route path="/logout" exact component={Logout} />
            <Route path="/reset-expired" exact component={ExpirePassword} />
            <Route component={() => (<h1 className="heading m-5">404 Page Not Found</h1>)} />
        </Switch>
    )
}

export default routes;