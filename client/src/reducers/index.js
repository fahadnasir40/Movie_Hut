import { combineReducers } from 'redux';
import movie from './movie_reducer';

const rootReducer = combineReducers({
    movie
});

export default rootReducer;