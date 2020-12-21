const { User } = require('../models/user');

const auth2 = (req, res, next) => {

    const roles = ["administrator", "supervisor", "worker"];
    let token = req.cookies.auth;

    User.findByToken(token, (err, user) => {
        if (err) throw err;
        if (!user) return res.json({
            error: true
        });

        if (roles.length && !roles.includes(user.role)) {
            // user's role is not authorized
            return res.status(401).json({ message: 'Unauthorized' });
        }
        else if (user.status) {
            if (user.status === 'suspended')
                return res.status(401).json({ message: 'Unauthorized' });
        }

        req.token = token;
        req.user = user;
        next();
    })
}

module.exports = { auth2 };