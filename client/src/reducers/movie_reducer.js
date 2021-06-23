export default function (state = {}, action) {
    switch (action.type) {


        case 'GET_MOVIE_INFO':
            return { ...state, movieInfo: action.payload }
        case 'GET_MOVIE_BY_NAME':
            return { ...state, movieDetails: action.payload }
        case 'GET_MOVIE_FROM_TMDB':
            return { ...state, movieDetails: action.payload }
        case 'GET_HOME_MOVIES':
            return { ...state, moviesList: action.payload.moviesList }
        case 'VOTE_REVIEW':
            return { ...state, votedReview: action.payload }

        case 'CLEAR_MOVIE':
            return { ...state, movieDetails: action.payload }
        case 'CLEAR_MOVIE_REVIEW':
            return { ...state, movieReview: action.payload }
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