import { combineReducers } from 'redux';
import movie from './movie_reducer';
import cinema from './cinema_reducer';
import showtime from './showtime_reducer';
import user from './user_reducer';


const rootReducer = combineReducers({
    movie,
    cinema,
    showtime,
    user
});

export default rootReducer;