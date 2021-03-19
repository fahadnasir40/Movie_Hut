import axios from 'axios';


/* =========== USER ============== */

export function loginUser({ email, password }) {

    const request = axios.post(`/api/login`, { email, password })
        .then(response => response.data);

    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function auth() {
    const request = axios.get('/api/auth')
        .then(response => response.data);

    return {
        type: 'USER_AUTH',
        payload: request
    }
}
export function getProfile() {
    const request = axios.get('/api/profile')
        .then(response => response.data);

    return {
        type: 'USER_PROFILE',
        payload: request
    }
}


export function getUsers(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/users?skip=${start}&limit=${limit}&order=${order}`)
        .then(response => {
            if (list) {
                return [...list, ...response.data];
            }
            else {
                return response.data;
            }
        })
        .catch(error => {

        });

    return {
        type: 'GET_USERS',
        payload: request
    }
}


export function userRegister(user) {
    const request = axios.post(`/api/register`, user)
    return (dispatch) => {
        request.then(({ data }) => {
            let response = {
                success: data.success,
                user
            }
            dispatch({
                type: 'USER_REGISTER',
                payload: response
            })
        })
    }
}

export function getHomeMovies() {

    const request = axios.get(`/api/getHomeMovies`)
        .then(response => response.data);

    return {
        type: 'GET_HOME_MOVIES',
        payload: request
    }
}

export function getMovieInfo(id) {

    const request = axios.get(`/api/getMovieInfo?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_MOVIE_INFO',
        payload: request
    }
}

export function changePassword(data) {
    const request = axios.post(`/api/change_password`, data)
        .then(response => response.data);

    return {
        type: 'CHANGE_PASSWORD',
        payload: request
    }
}


export function updateUser(user) {
    const request = axios.post(`/api/user_profile_update`, user);

    return (dispatch) => {
        request.then(({ data }) => {
            let response = {
                success: data.success,
                user
            }
            dispatch({
                type: 'UPDATE_USER',
                payload: response
            })
        })
    }
}


export function changeUser(user) {
    const request = axios.post(`/api/userchange`, user);

    return {
        type: 'CHANGE_USER',
        payload: request
    }

}

export function changeUserPassword(user) {
    const request = axios.post(`/api/userchangepwd`, user);

    return {
        type: 'CHANGE_USER_PASSWORD',
        payload: request
    }
}