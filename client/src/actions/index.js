import axios from 'axios';


/* =========== USER ============== */

export function forgotPassword(email) {
    const request = axios.post('/api/forgotPassword', { email })
        .then(response => response.data);
    return {
        type: 'USER_FORGOT_PASSWORD',
        payload: request
    }
}

export function resetPassword(resetPasswordToken) {
    const request = axios.get(`/api/reset?resetPasswordToken=${resetPasswordToken}`)
        .then(response => response.data);
    return {
        type: 'USER_RESET_PASSWORD',
        payload: request
    }
}

export function updatePasswordEmail(resetPasswordToken, password) {
    const request = axios.put("/api/updatePasswordViaEmail", { resetPasswordToken, password })
        .then(response => response.data);
    return {
        type: 'USER_UPDATE_PASSWORD',
        payload: request
    }
}

export function updateCinema(cinema) {
    const request = axios.post("/api/cinema-update", cinema)
        .then(response => response.data);

    return {
        type: 'UPDATE_CINEMA',
        payload: request
    }
}

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

export function getUser(id) {
    const request = axios.get(`/api/user-info?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_USER',
        payload: request
    }
}

export function getCinemaDetails(id) {
    const request = axios.get(`/api/cinema-info?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_CINEMA',
        payload: request
    }
}

export function getUserSettings(id) {
    const request = axios.get(`/api/user-settings?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_USER',
        payload: request
    }
}

export function updateUserInfo(user) {
    const request = axios.post("/api/user-update", user)
        .then(response => response.data);

    return {
        type: 'UPDATE_USER',
        payload: request
    }
}

export function suspendUser(id) {
    const request = axios.post(`/api/user-suspend?id=${id}`)
        .then(response => response.data);

    return {
        type: 'SUSPEND_USER',
        payload: request
    }
}

export function unSuspendUser(id) {
    const request = axios.post(`/api/user-unsuspend?id=${id}`)
        .then(response => response.data);

    return {
        type: 'UNSUSPEND_USER',
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

export function getReports(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getReportsList?skip=${start}&limit=${limit}&order=${order}`)
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
        type: 'GET_REPORTS',
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



/*     ADMIN */

export function getCinemasList(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`api/getCinemasList?skip=${start}&limit=${limit}&order=${order}`)
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
        type: 'GET_CINEMAS_LIST',
        payload: request
    }
}

export function getCinemaMovieShowtimes(cinemaId, movieId) {

    const request = axios.get(`/api/getCinemaMovieShowtimes?cinemaId=${cinemaId}&movieId=${movieId}`)
        .then(response => response.data);

    return {
        type: 'GET_CINEMA_MOVIE_SHOWTIMES',
        payload: request
    }
}






/*  MOVIES  */
export function getHomeMovies() {

    const request = axios.get(`/api/getHomeMovies`)
        .then(response => response.data);

    return {
        type: 'GET_HOME_MOVIES',
        payload: request
    }
}

export function getRecommendedMovies() {

    const request = axios.get(`/api/getRecommendations`)
        .then(response => response.data);

    return {
        type: 'GET_HOME_RECEOMMENDED_MOVIES',
        payload: request
    }
}

export function getCinemaHomeMovies() {

    const request = axios.get(`/api/getCinemaHomeMovies`)
        .then(response => response.data);

    return {
        type: 'GET_HOME_CINEMA_MOVIES',
        payload: request
    }
}

export function getCinemaShowingMovies(cinemaId) {

    const request = axios.get(`/api/getMoviesRunningInCinemas?cinemaId=${cinemaId}`)
        .then(response => response.data);

    return {
        type: 'GET_CINEMA_MOVIES_SHOWING',
        payload: request
    }
}


export function getFavoriteMovies() {
    const request = axios.get(`/api/getFavoriteMovies`)
        .then(response => response.data);

    return {
        type: 'GET_FAVORITE_MOVIES',
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

export function getMovieByName(name) {

    const request = axios.get(`/api/getMovieByName?name=${name}`)
        .then(response => response.data);

    return {
        type: 'GET_MOVIE_BY_NAME',
        payload: request
    }
}

export function getCinemaMovies(id) {

    const request = axios.get(`/api/getCinemaMovies?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_CINEMA_MOVIES',
        payload: request
    }
}

export function getMovieFromTMDB(name) {

    const request = axios.get(`/api/getMovieTMDB?name=${name}`)
        .then(response => response.data);

    return {
        type: 'GET_MOVIE_FROM_TMDB',
        payload: request
    }
}

export function changePassword(data) {
    const request = axios.post(`/api/change_password`, { password: data.password, newPassword: data.newPassword, email: data.email })
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

export function clearUser() {
    return {
        type: 'CLEAR_USER',
        payload: {}
    }
}

export function clearUpdatePassword() {
    return {
        type: 'CLEAR_UPDATE_PASSWORD',
        payload: {}
    }
}

export function changeUserPassword(user) {
    const request = axios.post(`/api/userchangepwd`, user);

    return {
        type: 'CHANGE_USER_PASSWORD',
        payload: request
    }
}

export function addMovieToFavorites(movieId) {
    console.log("Movie Id", movieId);
    const request = axios.post('/api/addToFavorites', { movieId: movieId })
        .then(response => response.data);
    return {
        type: 'ADD_MOVIE_TO_FAVORITES',
        payload: request
    }
}

export function addCinema(cinema) {
    const request = axios.post('/api/create-cinema', cinema)
        .then(response => response.data);
    return {
        type: 'ADD_CINEMA',
        payload: request
    }
}

export function addMovieInCinema(movieData) {
    const request = axios.post('/api/addMovieInCinema', movieData)
        .then(response => response.data);
    return {
        type: 'ADD_MOVIE_IN_CINEMA',
        payload: request
    }
}



export function upvoteReview(reviewId) {

    const request = axios.post('/api/voteReview', { reviewId: reviewId, voteType: 1 })
        .then(response => response.data);
    return {
        type: 'VOTE_REVIEW',
        payload: request
    }
}


export function downvoteReview(reviewId) {

    const request = axios.post('/api/voteReview', { reviewId: reviewId, voteType: -1 })
        .then(response => response.data);
    return {
        type: 'VOTE_REVIEW',
        payload: request
    }
}


export function clearReviewVote() {
    return {
        type: 'VOTE_REVIEW',
        payload: {}
    }
}

export function clearCinema() {
    return {
        type: 'CLEAR_CINEMA',
        payload: {}
    }
}

export function clearCinemaUpdate() {
    return {
        type: 'CLEAR_CINEMA_UPDATE',
        payload: {}
    }
}

export function clearCinemaMovie() {
    return {
        type: 'CLEAR_CINEMA_MOVIE',
        payload: {}
    }
}

export function clearMovie() {
    return {
        type: 'CLEAR_MOVIE',
        payload: {}
    }
}

export function clearMovieInfo() {
    return {
        type: 'CLEAR_MOVIE_INFO',
        payload: {}
    }
}

export function clearMovieShowtimes() {
    return {
        type: 'CLEAR_MOVIE_SHOWTIMES',
        payload: {}
    }
}


export function addShowtime(showtime) {
    const request = axios.post('/api/create-showtime', showtime)
        .then(response => response.data);
    return {
        type: 'ADD_SHOWTIME',
        payload: request
    }
}


export function addReview(review) {
    const request = axios.post('/api/create-review', review)
        .then(response => response.data);
    return {
        type: 'ADD_MOVIE_REVIEW',
        payload: request
    }
}

export function reportReview(report) {
    const request = axios.post('/api/report-review', report)
        .then(response => response.data);
    return {
        type: 'REPORT_MOVIE_REVIEW',
        payload: request
    }
}

export function sendPropmotionalEmails(emailData) {
    const request = axios.post(`/api/sendPromotionalEmail`, emailData)
        .then(response => response.data);
    return {
        type: 'CINEMAS_PROMOTIONS_EMAILS',
        payload: request
    }

}

export function clearShowtime() {
    return {
        type: 'CLEAR_SHOWTIME',
        payload: {}
    }
}

export function clearMovieReview() {
    return {
        type: 'CLEAR_MOVIE_REVIEW',
        payload: {}
    }
}
export function clearReviewReport() {
    return {
        type: 'CLEAR_REVIEW_REPORT',
        payload: {}
    }
}


export function getCinemas(
    start = 0,
    limit = 0,
    order = 'desc',
    list = ''
) {

    const request = axios.get(`/api/getCinemas`)
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
        type: 'GET_CINEMAS_NAME',
        payload: request
    }
}

export function deleteReview(id) {
    const request = axios.delete(`/api/delete_review?id=${id}`)
        .then(response => response.data)

    return {
        type: 'DELETE_REVIEW',
        payload: request
    }
}

export function resolveReport(id) {
    const request = axios.post(`/api/resolve_report?id=${id}`)
        .then(response => response.data)

    return {
        type: 'RESOLVE_REPORT',
        payload: request
    }
}