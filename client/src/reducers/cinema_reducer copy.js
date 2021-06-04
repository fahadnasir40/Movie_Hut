export default function (state = {}, action) {
    switch (action.type) {


        // case 'GET_MOVIE_INFO':
        //     return { ...state, movieInfo: action.payload }
        // case 'GET_SHARED_DOCUMENT':
        //     return { ...state, sharedDocument: action.payload }
        // case 'UPDATE_DOCUMENT':
        //     return {
        //         ...state,
        //         documentUpdated:action.payload.success,
        //         newDocument:action.payload.doc
        //     }
        case 'ADD_CINEMA':
            return { ...state, cinema: action.payload }
        case 'GET_CINEMAS_LIST':
            return { ...state, cinemaList: action.payload }
        case 'GET_CINEMA_MOVIES':
            return { ...state, cinemaMoviesList: action.payload }
        case 'ADD_MOVIE_IN_CINEMA':
            return { ...state, cinemaMovie: action.payload }
        case 'CLEAR_CINEMA':
            return { ...state, cinema: action.payload, cinemaMovies: action.payload }
        case 'CLEAR_CINEMA_MOVIE':
            return { ...state, cinemaMovie: action.payload, cinemaMoviesList: action.payload }
        case 'GET_CINEMAS_NAME':
            return { ...state, cinemasName: action.payload }
        case 'CINEMAS_PROMOTIONS_EMAILS':
            return { ...state, promotionalMails: action.payload }
        case 'GET_CINEMA_MOVIES_SHOWING':
            return { ...state, cinemaMovies: action.payload }

        // case 'DOWNLOAD_DOCUMENT':
        //     return {...state,downloadStatus:action.payload}

        // case 'INVITE_USER':
        //     return {...state,userInvited:action.payload}
        default:
            return state;
    }
}