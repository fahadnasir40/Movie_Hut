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
        case 'ADD_SHOWTIME':
            return {...state, showtime:action.payload}
        case 'CLEAR_SHOWTIME':
            return {...state, showtime:action.payload}
        // case 'DOWNLOAD_DOCUMENT':
        //     return {...state,downloadStatus:action.payload}

        // case 'INVITE_USER':
        //     return {...state,userInvited:action.payload}
        default:
            return state;
    }
}