const { User } = require('./../models/user');

const auth = (req, res, next) => {

    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            error: true
        });
        // if (user.status) {
        //     if (user.status === 'suspended')
        //         return res.status(401).json({ message: 'Unauthorized' });
        // }
        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth };