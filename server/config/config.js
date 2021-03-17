const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI,
        TMDB_API_KEY: process.env.TMDB_API_KEY
    },
    default: {
        SECRET: 'supersecretpassword123',
        DATABASE: 'mongodb://localhost:27017/Movie_Hut',
        TMDB_API_KEY: '2b4b8620af603c26545f8afabb620241'
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}