const config = {
    production: {
        SECRET: process.env.SECRET,
        DATABASE: process.env.MONGODB_URI
    },
    default: {
        SECRET: 'supersecretpassword123',
        DATABASE: 'mongodb://localhost:27017/Movie_Hut'
    }
}

exports.get = function get(env) {
    return config[env] || config.default;
}