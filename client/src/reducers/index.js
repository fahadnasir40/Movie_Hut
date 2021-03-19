import { combineReducers } from 'redux';
import movie from './movie_reducer';
import cinema from './cinema_reducer';


const rootReducer = combineReducers({
    movie,
    cinema,
});

export default rootReducer;