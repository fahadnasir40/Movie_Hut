export default function(state={},action){
    switch(action.type){
        case 'USER_LOGIN':
            return {...state,login:action.payload}
        case 'USER_AUTH':
            return {...state,login:action.payload}
        // case 'GET_USER_POSTS':
        //     return {...state,userPosts:action.payload}
        // case 'GET_USER':
        //     return {...state,users:action.payload}
        case 'USER_REGISTER':
            return {
                ...state,
                register:action.payload.success
            }
        case 'USER_FORGOT_PASSWORD':
            return {
                ...state,
                message:action.payload
            }
        case 'USER_RESET_PASSWORD':
            return {
                ...state,
                message:action.payload
            }
        case 'USER_UPDATE_PASSWORD':
            return {
                ...state,
                message:action.payload
            }
        default:
            return state;
    }
}