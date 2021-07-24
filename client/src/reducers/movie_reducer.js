export default function (state = {}, action) {
    switch (action.type) {


        case 'GET_MOVIE_INFO':
            return { ...state, movieInfo: action.payload }
        case 'GET_MOVIE_BY_NAME':
            return { ...state, movieDetails: action.payload }
        case 'GET_MOVIE_FROM_TMDB':
            return { ...state, movieDetails: action.payload }
        case 'GET_HOME_MOVIES':
            return { ...state, moviesList: action.payload }
        case 'GET_HOME_RECEOMMENDED_MOVIES':
            return { ...state, recommendedMovies: action.payload }
        case 'GET_HOME_CINEMA_MOVIES':
            return { ...state, cinemaMovies: action.payload }
        case 'GET_FAVORITE_MOVIES':
            return { ...state, favoriteMovies: action.payload.movies }
        case 'VOTE_REVIEW':
            return { ...state, votedReview: action.payload }
        case 'ADD_MOVIE_TO_FAVORITES':
            return { ...state, favoriteAdded: action.payload }
        case 'REPORT_MOVIE_REVIEW':
            return { ...state, reportReview: action.payload }
        case 'CLEAR_MOVIE':
            return { ...state, movieDetails: action.payload, favoriteAdded: action.payload }
        case 'CLEAR_FAVOTIE_MOVIES':
            return { ...state, favoriteMovies: action.payload }
        case 'CLEAR_MOVIE_REVIEW':
            return { ...state, movieReview: action.payload }
        case 'CLEAR_REVIEW_REPORT':
            return { ...state, reportReview: action.payload }

        // case 'GET_SHARED_DOCUMENT':
        //     return { ...state, sharedDocument: action.payload }
        // case 'UPDATE_DOCUMENT':
        //     return {
        //         ...state,
        //         documentUpdated:action.payload.success,
        //         newDocument:action.payload.doc
        //     }
        case 'ADD_MOVIE_REVIEW':
            return { ...state, movieReview: action.payload }
        // case 'DOWNLOAD_DOCUMENT':
        //     return {...state,downloadStatus:action.payload}

        // case 'INVITE_USER':
        //     return {...state,userInvited:action.payload}
        default:
            return state;
    }
}