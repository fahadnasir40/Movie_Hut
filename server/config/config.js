const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        TMDB_API_KEY: process.env.TMDB_API_KEY,
        MOVIEHUT_EMAIL_AUTH_USER: process.env.MOVIEHUT_EMAIL_AUTH_USER,
        MOVIEHUT_EMAIL_AUTH_SECRET: process.env.MOVIEHUT_EMAIL_AUTH_SECRET,
    },
    default: {
        SECRET: '',
        DATABASE: 'mongodb://localhost:27017/Movie_Hut',
        TMDB_API_KEY: '',
        MOVIEHUT_EMAIL_AUTH_USER: '',
        MOVIEHUT_EMAIL_AUTH_SECRET: ''
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}